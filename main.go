package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/xuender/grephub/app"
	"github.com/xuender/kit/los"
)

//go:embed all:frontend/www
var _assets embed.FS

const (
	_width  = 1024
	_height = 768
)

func main() {
	app := app.InitApp()
	los.Must0(wails.Run(&options.App{
		Title:       "Grep Hub",
		Width:       _width,
		Height:      _height,
		Menu:        app.Menu,
		AssetServer: &assetserver.Options{Assets: _assets},
		OnStartup:   app.Startup,
		Bind:        app.Bind,
	}))
}
