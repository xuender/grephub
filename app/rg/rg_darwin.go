package rg

import (
	"github.com/xuender/grephub/app/grep"
)

// nolint
var _cmds = [...]string{
	// macOS Homebrew or Linuxbrew
	"brew install ripgrep",
	// MacPorts
	"port install ripgrep",
}

func (p *Rg) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
