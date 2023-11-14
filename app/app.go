package app

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	// nolint
	ctx     context.Context
	service *Service
	Bind    []any
	Menu    *menu.Menu
}

func NewApp(service *Service) *App {
	var (
		app      = &App{service: service, Bind: []any{service}}
		appMenu  = menu.NewMenu()
		helpMenu = appMenu.AddSubmenu("Help")
	)

	helpMenu.AddText("About", keys.CmdOrCtrl("a"), app.About)
	helpMenu.AddSeparator()
	helpMenu.AddText("Quit", keys.CmdOrCtrl("q"), app.Quit)
	app.Menu = appMenu

	return app
}

func (p *App) Quit(_ *menu.CallbackData) {
	runtime.Quit(p.ctx)
}

func (p *App) About(_ *menu.CallbackData) {
	runtime.EventsEmit(p.ctx, "about", true)
}

func (p *App) Startup(ctx context.Context) {
	p.ctx = ctx
	p.service.ctx = ctx
}
