package search

import (
	"bufio"
	"context"
	"log/slog"
	"os"
	"os/exec"
	"path/filepath"
	"slices"
	"time"

	"github.com/ncruces/zenity"
	"github.com/pkg/browser"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search/ag"
	"github.com/xuender/grephub/search/grep"
	"github.com/xuender/grephub/search/rg"
	"github.com/xuender/grephub/search/ugrep"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
)

type (
	Service struct {
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

func (p *Service) Config() *pb.Msg {
	p.cfg.Save()

	return &pb.Msg{
		Dirs:  p.cfg.GetDirs(),
		Query: p.cfg.GetQuery(),
		Value: p.pro.String(),
		Type:  pb.Type_config,
	}
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
}

func (p *Service) DelDir(dir string) {
	idx := slices.Index(p.cfg.GetDirs(), dir)
	if idx < 0 {
		return
	}

	p.cfg.Dirs = slices.Delete(p.cfg.GetDirs(), idx, idx+1)
}

func (p *Service) Open(path string) {
	if oss.IsWindows() {
		los.Must0(browser.OpenFile(filepath.Dir(path)))

		return
	}

	los.Must0(browser.OpenFile(path))
}

func (p *Service) Query(ctx context.Context, query *pb.Query) *pb.Query {
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
	}

	los.Must0(searcher.Install())

	if len(query.GetPaths()) == 0 {
		query.Paths = []string{los.Must(os.Getwd())}
	}

	p.cfg.Query = query
	p.cfg.Save()

	go p.query(ctx, searcher, query)

	return query
}

func (p *Service) query(ctx context.Context, searcher Searcher, query *pb.Query) {
	size := 100
	acks := make(chan *pb.Ack, size)
	start := time.Now()

	go p.search(searcher, query, acks)

	msg := []*pb.Ack{}
	for ack := range acks {
		msg = append(msg, ack)
		if len(msg) >= size {
			runtime.EventsEmit(ctx, "ack", msg)

			msg = []*pb.Ack{}
		}
	}

	if len(msg) > 0 {
		runtime.EventsEmit(ctx, "ack", msg)
	}

	runtime.EventsEmit(ctx, "stop", time.Since(start).String())
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
