package ag

import (
	"bufio"
	"bytes"
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/exec"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/ncruces/zenity"
	"github.com/pkg/browser"
	"github.com/samber/lo"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/types"
	"google.golang.org/protobuf/proto"
)

type WsFunc func(*pb.Msg, *websocket.Conn)

type Service struct {
	cfg    *pb.Config
	cancel context.CancelFunc
	funcs  map[pb.Type]WsFunc
}

func NewService(
	cfg *pb.Config,
) *Service {
	serv := &Service{
		funcs: make(map[pb.Type]WsFunc),
		cfg:   cfg,
	}

	serv.funcs[pb.Type_config] = serv.config
	serv.funcs[pb.Type_query] = serv.query
	serv.funcs[pb.Type_ack] = serv.ack
	serv.funcs[pb.Type_open] = serv.open
	serv.funcs[pb.Type_select] = serv.selected
	serv.funcs[pb.Type_stop] = serv.stop

	return serv
}

func (p *Service) ack(_ *pb.Msg, _ *websocket.Conn) {}

func (p *Service) stop(msg *pb.Msg, conn *websocket.Conn) {
	if p.cancel != nil {
		p.cancel()
		p.cancel = nil
	}

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func (p *Service) config(msg *pb.Msg, conn *websocket.Conn) {
	p.cfg.Save()

	msg.Dirs = p.cfg.GetDirs()
	msg.Query = p.cfg.GetQuery()

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func (p *Service) query(msg *pb.Msg, conn *websocket.Conn) {
	if len(msg.GetQuery().GetPaths()) == 0 {
		msg.Query.Paths = []string{los.Must(os.Getwd())}
	}

	p.cfg.Query = msg.GetQuery()
	p.cfg.Save()

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	args := []string{}

	if msg.GetQuery().GetMaxCount() > 0 {
		args = append(args, "--max-count", types.Itoa(msg.GetQuery().GetMaxCount()))
	}

	if len(msg.GetQuery().GetTypes()) > 0 {
		args = append(args, lo.Map(
			msg.GetQuery().GetTypes(),
			func(str string, _ int) string { return "--" + str })...)
	}

	args = append(args, msg.GetQuery().GetPaths()...)
	size := 100
	acks := make(chan *pb.Ack, size)

	go p.AsyncAg(acks, msg.GetQuery().GetPattern(), args...)

	for ack := range acks {
		msg := &pb.Msg{Ack: ack, Type: pb.Type_ack}
		los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
	}

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(&pb.Msg{Type: pb.Type_stop}))))
}

func (p *Service) selected(msg *pb.Msg, conn *websocket.Conn) {
	dir, err := zenity.SelectFile(
		zenity.Filename("."),
		zenity.Directory())
	if err != nil {
		slog.Error("selected", "err", err)

		return
	}

	p.cfg.Dirs = append(p.cfg.GetDirs(), dir)

	p.cfg.Save()
	p.config(msg, conn)
}

func (p *Service) open(msg *pb.Msg, _ *websocket.Conn) {
	slog.Info("say", "open", msg.GetOpen())
	los.Must0(browser.OpenFile(msg.GetOpen()))
}

func (p *Service) Router(group *gin.RouterGroup) {
	group.POST("", p.get)
	group.DELETE("", p.delete)
}

func (p *Service) Say(msg *pb.Msg, conn *websocket.Conn) {
	slog.Info("say", "msg", msg)
	p.funcs[msg.GetType()](msg, conn)
}

func (p *Service) delete(ctx *gin.Context) {
	if p.cancel == nil {
		panic(ErrNoSearch)
	}

	p.cancel()
	p.cancel = nil

	ctx.Status(http.StatusNoContent)
}

func (p *Service) get(ctx *gin.Context) {
	query := &pb.Query{}
	los.Must0(ctx.Bind(query))

	if query.GetPattern() == "" {
		panic(ErrNoPattern)
	}

	if len(query.GetPaths()) == 0 {
		pwd, _ := os.Getwd()
		query.Paths = []string{pwd}
	}

	ctx.JSON(http.StatusOK, &pb.Result{
		Query: query,
		Acks:  pb.NewAcks(p.Ag(query.GetPattern(), query.GetPaths()...)),
	})
}

func (p *Service) Ag(pattern string, params ...string) string {
	var (
		ctxTimeout, cancel = context.WithTimeout(context.Background(), time.Minute)
		args               = []string{"--ackmate", pattern}
	)

	p.cancel = cancel

	args = append(args, params...)

	cmd := exec.CommandContext(ctxTimeout, "ag", args...)
	stdOut := &bytes.Buffer{}

	cmd.Stdout = stdOut

	if err := cmd.Run(); err != nil {
		return ""
	}

	return stdOut.String()
}

func (p *Service) AsyncAg(acks chan<- *pb.Ack, pattern string, params ...string) {
	var (
		ctxTimeout, cancel = context.WithTimeout(context.Background(), time.Minute)
		args               = []string{"--ackmate", pattern}
	)

	p.cancel = cancel

	args = append(args, params...)

	cmd := exec.CommandContext(ctxTimeout, "ag", args...)
	stdout := los.Must(cmd.StdoutPipe())
	reader := bufio.NewReader(stdout)
	group := sync.WaitGroup{}

	group.Add(1)

	go func() {
		defer group.Done()

		var (
			ack   *pb.Ack
			isNew = true
		)

		for {
			line, _, err := reader.ReadLine()
			if err != nil {
				break
			}

			switch {
			case isNew:
				ack = &pb.Ack{}
				ack.File = string(line)[1:]
				isNew = false
			case len(line) == 0:
				acks <- ack

				isNew = true
			default:
				if mate := pb.NewMate(string(line)); mate != nil {
					ack.Mates = append(ack.GetMates(), mate)
				}
			}
		}

		if !isNew {
			acks <- ack
		}
	}()

	_ = cmd.Run()

	group.Wait()

	close(acks)
}
