package app

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

	"github.com/ncruces/zenity"
	"github.com/pkg/browser"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/xuender/grephub/app/ag"
	"github.com/xuender/grephub/app/grep"
	"github.com/xuender/grephub/app/rg"
	"github.com/xuender/grephub/app/ugrep"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
)

type (
	Service struct {
		// nolint
		ctx    context.Context
		cfg    *pb.Config
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
		cfg: cfg,
		pro: pro,
		ag:  ags,
		rg:  rgs,
		ug:  ugs,
	}

	return serv
}

func (p *Service) About() string {
	return p.pro.String()
}

func (p *Service) Config() *pb.Config {
	p.cfg.Save()

	return p.cfg
}

func (p *Service) AddDirs() {
	dirs, err := zenity.SelectFileMultiple(
		zenity.Filename("."),
		zenity.Directory())
	if err != nil || len(dirs) == 0 {
		slog.Error("addDirs", "err", err)

		return
	}

	p.cfg.Dirs = append(p.cfg.GetDirs(), dirs...)
	p.cfg.Save()
}

func (p *Service) DelDir(dir string) {
	idx := slices.Index(p.cfg.GetDirs(), dir)
	if idx < 0 {
		return
	}

	p.cfg.Dirs = slices.Delete(p.cfg.GetDirs(), idx, idx+1)
	p.cfg.Save()
}

func (p *Service) Open(path string) {
	if oss.IsWindows() {
		los.Must0(browser.OpenFile(filepath.Dir(path)))

		return
	}

	los.Must0(browser.OpenFile(path))
}

func (p *Service) recover() {
	if err := recover(); err != nil {
		runtime.EventsEmit(p.ctx, "alert", fmt.Sprintf("%v", err))
	}
}

func (p *Service) Query(query *pb.Query) *pb.Result {
	defer p.recover()

	searcher := p.getSearcher(query)
	size := 100
	acks := make(chan *pb.Ack, size)

	go p.search(searcher, query, acks)

	items := []*pb.Ack{}
	for ack := range acks {
		items = append(items, ack)
	}

	return &pb.Result{Acks: items, Query: query}
}

func (p *Service) AsyncQuery(query *pb.Query) *pb.Query {
	defer p.recover()

	searcher := p.getSearcher(query)

	go p.query(searcher, query)

	return query
}

func (p *Service) getSearcher(query *pb.Query) Searcher {
	if query.GetPattern() == "" {
		panic(grep.ErrNoPattern)
	}

	var searcher Searcher

	switch query.GetSearcher() {
	case pb.Searcher_ag:
		searcher = p.ag
	case pb.Searcher_rg:
		searcher = p.rg
	case pb.Searcher_ug:
		searcher = p.ug
	case pb.Searcher_none:
		panic(grep.ErrNoSearcher)
	}

	los.Must0(searcher.Install())

	if len(query.GetPaths()) == 0 {
		query.Paths = []string{los.Must(os.Getwd())}
	}

	p.cfg.Query = query
	p.cfg.Save()

	return searcher
}

func (p *Service) query(searcher Searcher, query *pb.Query) {
	size := 100
	acks := make(chan *pb.Ack, size)
	start := time.Now()

	go p.search(searcher, query, acks)

	items := []*pb.Ack{}
	for ack := range acks {
		items = append(items, ack)
		if len(items) >= size {
			runtime.EventsEmit(p.ctx, "ack", items)

			items = []*pb.Ack{}
		}
	}

	if len(items) > 0 {
		runtime.EventsEmit(p.ctx, "ack", items)
	}

	runtime.EventsEmit(p.ctx, "stop", time.Since(start).String())
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
