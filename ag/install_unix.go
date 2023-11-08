//go:build !windows && !darwin

package ag

import (
	"bytes"
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

// nolint
func Install(conn *websocket.Conn) bool {
	cmd := exec.Command("lsb_release", "-a")
	buf := &bytes.Buffer{}
	cmd.Stdout = buf
	los.Must0(cmd.Run())

	out := buf.Bytes()
	msg := &pb.Msg{Type: pb.Type_alert}

	switch {
	case bytes.Contains(out, []byte("Ubuntu")), bytes.Contains(out, []byte("Debian")):
		// Ubuntu >= 13.10 (Saucy) or Debian >= 8 (Jessie)
		msg.Alert = "apt-get install silversearcher-ag"
	case bytes.Contains(out, []byte("Fedora")):
		// Fedora 21 and lower, Fedora 22+
		msg.Alert = "dnf install the_silver_searcher\nyum install the_silver_searcher"
	case bytes.Contains(out, []byte("RHEL")):
		// RHEL7+
		msg.Alert = "yum install epel-release.noarch the_silver_searcher"
	case bytes.Contains(out, []byte("Gentoo")):
		// Gentoo
		msg.Alert = "emerge -a sys-apps/the_silver_searcher"
	case bytes.Contains(out, []byte("Arch")):
		// Arch
		msg.Alert = "pacman -S the_silver_searcher"
	case bytes.Contains(out, []byte("Slackware")):
		// Slackware
		msg.Alert = "sbopkg -i the_silver_searcher"
	case bytes.Contains(out, []byte("openSUSE")):
		// openSUSE
		msg.Alert = "zypper install the_silver_searcher"
	case bytes.Contains(out, []byte("CentOS")):
		// CentOS
		msg.Alert = "yum install the_silver_searcher"
	case bytes.Contains(out, []byte("Nix")):
		// NixOS/Nix/Nixpkgs
		msg.Alert = "nix-env -iA silver-searcher"
	case bytes.Contains(out, []byte("FreeBSD")):
		// FreeBSD
		msg.Alert = "pkg install the_silver_searcher"
	case bytes.Contains(out, []byte("OpenBSD")), bytes.Contains(out, []byte("NetBSD")):
		// OpenBSD/NetBSD
		msg.Alert = "pkg_add the_silver_searcher"
	}

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	return true
}
