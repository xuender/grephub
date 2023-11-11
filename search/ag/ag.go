package ag

import (
	"bufio"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/samber/lo"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
	"github.com/xuender/kit/types"
)

type Ag struct {
	cmd string
	ok  bool
}

func NewAg() *Ag {
	cmd := "ag"
	if oss.IsWindows() {
		cmd = "ag.exe"
		if _, err := exec.LookPath(cmd); err != nil {
			file := los.Must(os.Executable())
			dir := filepath.Dir(file)
			cmd = filepath.Join(dir, cmd)
		}
	}

	ret := &Ag{cmd: cmd}
	ret.ok = ret.Find()

	return ret
}

func (p *Ag) Cmd(query *pb.Query) (string, []string) {
	args := []string{"--ackmate", query.GetPattern()}

	if query.GetMaxCount() > 0 {
		args = append(args, "--max-count", types.Itoa(query.GetMaxCount()))
	}

	if len(query.GetTypes()) > 0 {
		args = append(args, lo.Map(
			query.GetTypes(),
			func(str string, _ int) string { return "--" + str })...)
	}

	args = append(args, query.GetPaths()...)

	return p.cmd, args
}

func (p *Ag) Find() bool {
	_, err := exec.LookPath(p.cmd)

	return err == nil
}

func (p *Ag) Search(reader *bufio.Reader, acks chan<- *pb.Ack) {
	var (
		ack   *pb.Ack
		isNew = true
	)

	for {
		line, _, err := reader.ReadLine()
		if err != nil {
			break
		}

		switch {
		case isNew:
			ack = &pb.Ack{}
			ack.File = string(line)[1:]
			isNew = false
		case len(line) == 0:
			acks <- ack

			isNew = true
		default:
			if mate := NewMate(string(line)); mate != nil {
				ack.Mates = append(ack.GetMates(), mate)
			}
		}
	}

	if !isNew {
		acks <- ack
	}
}
