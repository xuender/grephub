package search

import (
	"bufio"
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/exec"
	"path/filepath"
	"slices"
	"time"

	"github.com/gorilla/websocket"
	"github.com/ncruces/zenity"
	"github.com/pkg/browser"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search/ag"
	"github.com/xuender/grephub/search/grep"
	"github.com/xuender/grephub/search/rg"
	"github.com/xuender/grephub/search/ugrep"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
	"google.golang.org/protobuf/proto"
)

type (
	WsFunc  func(*pb.Msg, *websocket.Conn)
	Service struct {
		cfg    *pb.Config
		funcs  map[pb.Type]WsFunc
		pro    *oss.ProcInfo
		cancel context.CancelFunc
		ag     *ag.Ag
		rg     *rg.Rg
		ug     *ugrep.Ugrep
	}
)

func NewService(
	cfg *pb.Config,
	pro *oss.ProcInfo,
	ags *ag.Ag,
	rgs *rg.Rg,
	ugs *ugrep.Ugrep,
) *Service {
	serv := &Service{
		cfg:   cfg,
		funcs: make(map[pb.Type]WsFunc),
		pro:   pro,
		ag:    ags,
		rg:    rgs,
		ug:    ugs,
	}

	serv.funcs[pb.Type_config] = serv.config
	serv.funcs[pb.Type_query] = serv.query
	serv.funcs[pb.Type_ack] = serv.ignore
	serv.funcs[pb.Type_open] = serv.open
	serv.funcs[pb.Type_stop] = serv.stop
	serv.funcs[pb.Type_alert] = serv.ignore
	serv.funcs[pb.Type_addDirs] = serv.addDirs
	serv.funcs[pb.Type_delDir] = serv.delDir

	return serv
}

func (p *Service) Say(msg *pb.Msg, conn *websocket.Conn) {
	defer func() {
		if err := recover(); err != nil {
			slog.Error("Say", "err", err)

			data, _ := proto.Marshal(&pb.Msg{
				Type:  pb.Type_alert,
				Value: fmt.Sprintf("%v", err),
			})
			_ = conn.WriteMessage(websocket.BinaryMessage, data)
		}
	}()

	p.funcs[msg.GetType()](msg, conn)
}

func (p *Service) ignore(_ *pb.Msg, _ *websocket.Conn) {}

func (p *Service) config(msg *pb.Msg, conn *websocket.Conn) {
	p.cfg.Save()

	msg.Dirs = p.cfg.GetDirs()
	msg.Query = p.cfg.GetQuery()
	msg.Value = p.pro.String()
	msg.Type = pb.Type_config

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func (p *Service) query(msg *pb.Msg, conn *websocket.Conn) {
	if msg.GetQuery().GetPattern() == "" {
		panic(grep.ErrNoPattern)
	}

	var searcher Searcher

	switch msg.GetQuery().GetSearcher() {
	case pb.Searcher_ag:
		searcher = p.ag
	case pb.Searcher_rg:
		searcher = p.rg
	case pb.Searcher_ug:
		searcher = p.ug
	}

	los.Must0(searcher.Install())

	if len(msg.GetQuery().GetPaths()) == 0 {
		msg.Query.Paths = []string{los.Must(os.Getwd())}
	}

	p.cfg.Query = msg.GetQuery()
	p.cfg.Save()

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	size := 100
	acks := make(chan *pb.Ack, size)
	start := time.Now()

	go p.search(searcher, msg.GetQuery(), acks)

	ackMsg := &pb.Msg{Type: pb.Type_ack, Ack: []*pb.Ack{}}
	for ack := range acks {
		ackMsg.Ack = append(ackMsg.GetAck(), ack)
		if len(ackMsg.GetAck()) >= size {
			los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(ackMsg))))

			ackMsg.Ack = []*pb.Ack{}
		}
	}

	if len(ackMsg.GetAck()) > 0 {
		los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(ackMsg))))
	}

	los.Must0(conn.WriteMessage(
		websocket.BinaryMessage,
		los.Must(proto.Marshal(&pb.Msg{
			Type:  pb.Type_stop,
			Value: time.Since(start).String(),
		})),
	))
}

func (p *Service) search(searcher Searcher, query *pb.Query, acks chan<- *pb.Ack) {
	defer close(acks)

	ctxTimeout, cancel := context.WithTimeout(context.Background(), time.Minute)
	p.cancel = cancel
	str, args := searcher.Cmd(query)

	slog.Info("search", "cmd", str, "args", args)

	cmd := exec.CommandContext(ctxTimeout, str, args...)
	HideWindow(cmd)

	stdout := los.Must(cmd.StdoutPipe())
	reader := bufio.NewReader(stdout)

	if err := cmd.Start(); err != nil {
		slog.Error("start", "err", err, "cmd", str, "args", args)

		return
	}

	searcher.Search(query, reader, acks)

	if err := cmd.Wait(); err != nil {
		slog.Error("wait", "err", err, "cmd", str, "args", args)
	}
}

func (p *Service) open(msg *pb.Msg, _ *websocket.Conn) {
	if oss.IsWindows() {
		los.Must0(browser.OpenFile(filepath.Dir(msg.GetValue())))

		return
	}

	los.Must0(browser.OpenFile(msg.GetValue()))
}

func (p *Service) addDirs(msg *pb.Msg, conn *websocket.Conn) {
	dirs, err := zenity.SelectFileMultiple(
		zenity.Filename("."),
		zenity.Directory())
	if err != nil || len(dirs) == 0 {
		slog.Error("addDirs", "err", err)

		return
	}

	p.cfg.Dirs = append(p.cfg.GetDirs(), dirs...)

	p.config(msg, conn)
}

func (p *Service) stop(msg *pb.Msg, conn *websocket.Conn) {
	if p.cancel != nil {
		p.cancel()
		p.cancel = nil
	}

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func (p *Service) delDir(msg *pb.Msg, conn *websocket.Conn) {
	idx := slices.Index(p.cfg.GetDirs(), msg.GetValue())
	if idx < 0 {
		return
	}

	p.cfg.Dirs = slices.Delete(p.cfg.GetDirs(), idx, idx+1)

	p.config(&pb.Msg{}, conn)
}
