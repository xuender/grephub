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
		app     = &App{service: service, Bind: []any{service}}
		appMenu = menu.NewMenu()
		help    = appMenu.AddSubmenu("Help")
	)

	help.AddText("About", nil, app.about)
	help.AddSeparator()
	help.AddText("Grephub", nil, app.grephub)
	help.AddText("ripgrep (rg)", nil, app.rg)
	help.AddText("ugrep (ug)", nil, app.ug)
	help.AddText("The Silver Searcher (ag)", nil, app.ag)
	help.AddText("ag win32", nil, app.agWin)
	help.AddSeparator()
	help.AddText("Quit", keys.CmdOrCtrl("q"), app.quit)
	app.Menu = appMenu

	return app
}

func (p *App) quit(_ *menu.CallbackData) {
	runtime.Quit(p.ctx)
}

func (p *App) about(_ *menu.CallbackData) {
	runtime.EventsEmit(p.ctx, "about", true)
}

func (p *App) grephub(_ *menu.CallbackData) {
	runtime.BrowserOpenURL(p.ctx, "https://github.com/xuender/grephub")
}

func (p *App) rg(_ *menu.CallbackData) {
	runtime.BrowserOpenURL(p.ctx, "https://github.com/BurntSushi/ripgrep")
}

func (p *App) ug(_ *menu.CallbackData) {
	runtime.BrowserOpenURL(p.ctx, "https://github.com/Genivia/ugrep")
}

func (p *App) ag(_ *menu.CallbackData) {
	runtime.BrowserOpenURL(p.ctx, "https://github.com/ggreer/the_silver_searcher")
}

func (p *App) agWin(_ *menu.CallbackData) {
	runtime.BrowserOpenURL(p.ctx, "https://github.com/k-takata/the_silver_searcher-win32")
}

func (p *App) Startup(ctx context.Context) {
	p.ctx = ctx
	p.service.ctx = ctx
}
