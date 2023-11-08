package ag

import (
	"bufio"
	"context"
	"log/slog"
	"os"
	"os/exec"
	"time"

	"github.com/gorilla/websocket"
	"github.com/ncruces/zenity"
	"github.com/pkg/browser"
	"github.com/samber/lo"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
	"github.com/xuender/kit/types"
	"google.golang.org/protobuf/proto"
)

// nolint
var _cmd = "ag"

type WsFunc func(*pb.Msg, *websocket.Conn)

type Service struct {
	cfg    *pb.Config
	cancel context.CancelFunc
	funcs  map[pb.Type]WsFunc
}

func NewService(
	cfg *pb.Config,
) *Service {
	if oss.IsWindows() {
		_cmd = ".\\ag.exe"
	}

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

	_, err := exec.LookPath(_cmd)
	if err != nil && Install(conn) {
		return
	}

	msg.Dirs = p.cfg.GetDirs()
	msg.Query = p.cfg.GetQuery()
	msg.Type = pb.Type_config

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

	p.config(msg, conn)
}

func (p *Service) open(msg *pb.Msg, _ *websocket.Conn) {
	slog.Info("say", "open", msg.GetOpen())
	los.Must0(browser.OpenFile(msg.GetOpen()))
}

func (p *Service) Say(msg *pb.Msg, conn *websocket.Conn) {
	slog.Info("say", "msg", msg)
	p.funcs[msg.GetType()](msg, conn)
}

func (p *Service) AsyncAg(acks chan<- *pb.Ack, pattern string, params ...string) {
	defer close(acks)

	var (
		ctxTimeout, cancel = context.WithTimeout(context.Background(), time.Minute)
		args               = []string{"--ackmate", pattern}
	)

	p.cancel = cancel

	args = append(args, params...)

	cmd := exec.CommandContext(ctxTimeout, _cmd, args...)
	stdout := los.Must(cmd.StdoutPipe())
	reader := bufio.NewReader(stdout)

	if err := cmd.Start(); err != nil {
		slog.Error("start", "err", err)

		return
	}

	var (
		ack   *pb.Ack
		isNew = true
	)

	for {
		line, _, err := reader.ReadLine()
		if err != nil {
			slog.Error("ag", "err", err)

			break
		}

		slog.Info(string(line))

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

	if err := cmd.Wait(); err != nil {
		slog.Error("wait", "err", err)
	}
}
