package app

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search"
)

type App struct {
	// nolint
	ctx context.Context
	ses *search.Service
}

func NewApp(ses *search.Service) *App {
	return &App{ses: ses}
}

func (p *App) Startup(ctx context.Context) {
	p.ctx = ctx
}

func (p *App) Config() *pb.Msg {
	return p.ses.Config()
}

func (p *App) AddDirs() {
	p.ses.AddDirs()
}

func (p *App) DelDir(dir string) {
	p.ses.DelDir(dir)
}

func (p *App) Open(path string) {
	p.ses.Open(path)
}

func (p *App) alert() {
	if err := recover(); err != nil {
		runtime.EventsEmit(p.ctx, "alert", fmt.Sprintf("%v", err))
	}
}

func (p *App) Query(query *pb.Query) *pb.Query {
	defer p.alert()

	return p.ses.Query(p.ctx, query)
}
