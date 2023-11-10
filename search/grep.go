package search

import (
	"bufio"
	"log/slog"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/samber/lo"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/oss"
	"github.com/xuender/kit/types"
)

type Grep struct {
	cmd string
}

func NewGrep() *Grep {
	cmd := "grep"
	if oss.IsWindows() {
		cmd = "grep.exe"
	}

	return &Grep{cmd: cmd}
}

func (p *Grep) Cmd(query *pb.Query) (string, []string) {
	args := []string{query.GetPattern(), "-n", "-r", "-P"}

	if query.GetMaxCount() > 0 {
		args = append(args, "-m", types.Itoa(query.GetMaxCount()))
	}

	if len(query.GetTypes()) > 0 {
		args = append(args, lo.Map(query.GetPaths(), func(path string, _ int) string {
			return filepath.Join(path, query.GetTypes()[0])
		})...)
	} else {
		args = append(args, query.GetPaths()...)
	}

	return p.cmd, args
}

func (p *Grep) Find() bool {
	_, err := exec.LookPath(p.cmd)

	return err == nil
}

func (p *Grep) Search(reader *bufio.Reader, acks chan<- *pb.Ack) {
	var (
		ack *pb.Ack
		old = ""
	)

	for {
		line, _, err := reader.ReadLine()
		if err != nil {
			break
		}

		str := string(line)

		idx := strings.Index(str, ":")
		if idx < 0 {
			continue
		}

		file := str[:idx]

		if old == file {
			// if mate := pb.NewMate(string(line)); mate != nil {
			// 	ack.Mates = append(ack.GetMates(), mate)
			// }
			slog.Info("xx")
		} else {
			if old != "" {
				acks <- ack
			}

			ack = &pb.Ack{}
			ack.File = file
			old = file
		}
	}

	if old != "" {
		acks <- ack
	}
}
