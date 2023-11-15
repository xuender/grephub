//go:build !windows && !darwin

package main

import (
	_ "embed"

	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed build/appicon.png
var _icon []byte

func setOptions(options *options.App) {
	options.Linux = &linux.Options{
		Icon:        _icon,
		ProgramName: "Grep Hub",
	}
}
