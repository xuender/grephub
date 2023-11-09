//go:build !windows && !darwin

package ag

import (
	"bytes"
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/xuender/agp/pb"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

// nolint
var _releases = [][]string{
	// Ubuntu >= 13.10 (Saucy) or Debian >= 8 (Jessie)
	{"apt-get install silversearcher-ag", "Ubuntu", "Debian"},
	// Fedora 21 and lower, Fedora 22+
	{"dnf install the_silver_searcher\nyum install the_silver_searcher", "Fedora"},
	// RHEL7+
	{"yum install epel-release.noarch the_silver_searcher", "RHEL"},
	// Gentoo
	{"emerge -a sys-apps/the_silver_searcher", "Gentoo"},
	// Arch
	{"pacman -S the_silver_searcher", "Arch"},
	// Slackware
	{"sbopkg -i the_silver_searcher", "Slackware"},
	// openSUSE
	{"zypper install the_silver_searcher", "openSUSE"},
	// CentOS
	{"yum install the_silver_searcher", "CentOS"},
	// NixOS/Nix/Nixpkgs
	{"nix-env -iA silver-searcher", "Nix"},
	// FreeBSD
	{"pkg install the_silver_searcher", "FreeBSD"},
	// OpenBSD/NetBSD
	{"pkg_add the_silver_searcher", "OpenBSD", "NetBSD"},
}

// nolint
func Install(conn *websocket.Conn) bool {
	cmd := exec.Command("lsb_release", "-a")
	buf := &bytes.Buffer{}
	cmd.Stdout = buf
	los.Must0(cmd.Run())

	out := buf.Bytes()
	msg := &pb.Msg{Type: pb.Type_alert}

exit:
	for _, release := range _releases {
		for _, ver := range release[1:] {
			if bytes.Contains(out, []byte(ver)) {
				msg.Value = release[0]

				break exit
			}
		}
	}

	if msg.GetValue() == "" {
		msg.Value = _releases[0][0]
	}

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	return true
}

func HideWindow(_ *exec.Cmd) {
}
