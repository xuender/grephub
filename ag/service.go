package ag

import (
	"bytes"
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/types"
	"google.golang.org/protobuf/proto"
)

type Service struct {
	cancel context.CancelFunc
}

func NewService() *Service {
	return &Service{}
}

func (p *Service) Router(group *gin.RouterGroup) {
	group.POST("", p.get)
	group.DELETE("", p.delete)
}

func (p *Service) Say1(msg *pb.Msg, conn *websocket.Conn) {
	slog.Info("say", "msg", msg)

	if len(msg.GetQuery().GetPaths()) == 0 {
		msg.Query.Paths = []string{los.Must(os.Getwd())}
	}

	data, _ := proto.Marshal(msg)
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, data))

	args := []string{}

	if msg.GetQuery().GetMaxCount() > 0 {
		args = append(args, "--max-count", types.Itoa(msg.GetQuery().GetMaxCount()))
	}

	args = append(args, msg.GetQuery().GetPaths()...)

	msg.Acks = pb.NewAcks(p.Ag(msg.GetQuery().GetPattern(), args...))

	msg.Query = nil
	data, _ = proto.Marshal(msg)
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, data))
}

func (p *Service) Say(msg *pb.Msg, conn *websocket.Conn) {
	slog.Info("say", "msg", msg)

	if len(msg.GetQuery().GetPaths()) == 0 {
		msg.Query.Paths = []string{los.Must(os.Getwd())}
	}

	data, _ := proto.Marshal(msg)
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, data))

	args := []string{}

	if msg.GetQuery().GetMaxCount() > 0 {
		args = append(args, "--max-count", types.Itoa(msg.GetQuery().GetMaxCount()))
	}

	args = append(args, msg.GetQuery().GetPaths()...)

	msg.Acks = pb.NewAcks(p.Ag(msg.GetQuery().GetPattern(), args...))

	msg.Query = nil
	data, _ = proto.Marshal(msg)
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, data))
}

func (p *Service) delete(ctx *gin.Context) {
	if p.cancel == nil {
		panic(ErrNoSearch)
	}

	p.cancel()

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
