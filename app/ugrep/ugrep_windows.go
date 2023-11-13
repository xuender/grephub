package ugrep

import (
	_ "embed"

	"github.com/xuender/grephub/app/grep"
)

var _cmds = [...]string{
	"download https://github.com/Genivia/ugrep/releases/download/v4.3.2/ugrep.exe",
	// Winget
	"winget install Genivia.ugrep",
	// Chocolatey
	"choco install ugrep",
	// Scoop
	"scoop install ugrep",
}

func (p *Ugrep) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
