//go:build !windows && !darwin

package ugrep

import (
	"github.com/xuender/grephub/search/grep"
)

// nolint
var _cmds = [...]string{
	// Debian
	"apt-get install ugrep",
	// Alpine Linux
	"apk add ugrep ugrep-doc",
	// Arch Linux
	"pacman -S ugrep",
	// CentOS, RHEL
	"dnf install ugrep",
	// Fedora
	"dnf install ugrep",
	// FreeBSD
	"pkg install ugrep",
	// Haiku
	"pkgman install cmd:ugrep",
}

func (p *Ugrep) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
