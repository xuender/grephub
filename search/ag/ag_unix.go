//go:build !windows && !darwin

package ag

import (
	"github.com/xuender/grephub/search/grep"
)

// nolint
var _cmds = [...]string{
	// Ubuntu >= 13.10 (Saucy) or Debian >= 8 (Jessie)
	"apt-get install silversearcher-ag",
	"apt install silversearcher-ag",
	// Fedora 21 and lower, Fedora 22+
	"dnf install the_silver_searcher",
	// CentOS
	// RHEL7+
	`yum install the_silver_searcher
# or
yum install epel-release.noarch the_silver_searcher`,
	// Gentoo
	"emerge -a sys-apps/the_silver_searcher",
	// Arch
	"pacman -S the_silver_searcher",
	// Slackware
	"sbopkg -i the_silver_searcher",
	// openSUSE
	"zypper install the_silver_searcher",
	// NixOS/Nix/Nixpkgs
	"nix-env -iA silver-searcher",
	// FreeBSD
	"pkg install the_silver_searcher",
	// OpenBSD/NetBSD
	"pkg_add the_silver_searcher",
}

func (p *Ag) Install() error {
	if p.ok {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
