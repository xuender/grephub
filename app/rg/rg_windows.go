package rg

import (
	_ "embed"

	"github.com/xuender/grephub/app/grep"
)

var _cmds = [...]string{
	"download https://github.com/BurntSushi/ripgrep/releases/download/13.0.0/ripgrep-13.0.0-x86_64-pc-windows-msvc.zip",
	// Chocolatey
	"choco install ripgrep",
	// Scoop
	"scoop install ripgrep",
	// Winget
	"winget install BurntSushi.ripgrep.MSVC",
}

func (p *Rg) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
