//go:build !windows && !darwin

package rg

import (
	"github.com/xuender/grephub/search/grep"
)

// nolint
var _cmds = [...]string{
	// Debian, Ubuntu, ALT
	"apt-get install ripgrep",
	// FreeBSD
	"pkg install ripgrep",
	// OpenBSD
	"pkg_add ripgrep",
	// NetBSD
	"pkgin install ripgrep",
	// Haiku, Arch Linux
	"pkgman install ripgrep\npacman -S ripgrep",
	// Gentoo
	"emerge sys-apps/ripgrep",
	// Fedora
	"dnf install ripgrep",
	// openSUSE
	"zypper install ripgrep",
	// RHEL/CentOS 7/8
	`yum install -y yum-utils
yum-config-manager --add-repo=https://copr.fedorainfracloud.org/coprs/carlwgeorge/ripgrep/repo/epel-7/carlwgeorge-ripgrep-epel-7.repo
yum install ripgrep`,
	// Nix
	"nix-env --install ripgrep",
	// Guix
	"guix install ripgrep",
}

func (p *Rg) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
