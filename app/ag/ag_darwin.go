package ag

import (
	"github.com/xuender/grephub/app/grep"
)

// nolint
var _cmds = [...]string{
	// Homebrew
	"brew install the_silver_searcher",
	// MacPorts
	"port install the_silver_searcher",
}

func (p *Ag) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
