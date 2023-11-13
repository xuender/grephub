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
var assets embed.FS

const (
	_width  = 1024
	_height = 768
)

func main() {
	app := app.InitApp()

	los.Must0(wails.Run(&options.App{
		Title:  "Grep Hub",
		Width:  _width,
		Height: _height,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		// nolint
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind:             []any{app},
	}))
}
