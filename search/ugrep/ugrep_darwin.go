package ugrep

import (
	"github.com/xuender/grephub/search/grep"
)

// nolint
var _cmds = [...]string{
	// Homebrew
	"brew install ugrep",
	// MacPorts
	"port install ugrep",
}

func (p *Ugrep) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
