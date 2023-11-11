package rg

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/samber/lo"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
)

type Rg struct {
	cmd string
	ok  bool
}

func NewRg() *Rg {
	cmd := "rg"
	if oss.IsWindows() {
		cmd = "rg.exe"
		if _, err := exec.LookPath(cmd); err != nil {
			file := los.Must(os.Executable())
			dir := filepath.Dir(file)
			cmd = filepath.Join(dir, cmd)
		}
	}

	ret := &Rg{cmd: cmd}
	ret.ok = ret.Find()

	return ret
}

func (p *Rg) Cmd(query *pb.Query) (string, []string) {
	args := []string{"--json", query.GetPattern()}

	if query.GetMaxCount() > 0 {
		args = append(args, fmt.Sprintf("-m=%d", query.GetMaxCount()))
	}

	if len(query.GetTypes()) > 0 {
		args = append(args, lo.Map(
			query.GetTypes(),
			func(str string, _ int) string { return "-t" + str })...)
	}

	args = append(args, query.GetPaths()...)

	return p.cmd, args
}

func (p *Rg) Find() bool {
	_, err := exec.LookPath(p.cmd)

	return err == nil
}

func (p *Rg) Search(reader *bufio.Reader, acks chan<- *pb.Ack) {
	var ack *pb.Ack

	for {
		lineBytes, _, err := reader.ReadLine()
		if err != nil {
			break
		}

		line := &Line{}
		if err := json.Unmarshal(lineBytes, line); err != nil {
			continue
		}

		switch line.Type {
		case "begin":
			ack = &pb.Ack{File: line.Data.Path.Text, Mates: []*pb.Mate{}}
		case "end":
			acks <- ack
		case "match":
			hits := make([]*pb.Hit, len(line.Data.Submatches))
			for i, sub := range line.Data.Submatches {
				hits[i] = &pb.Hit{
					Col: uint32(sub.Start),
					Len: uint32(sub.End - sub.Start),
				}
			}

			ack.Mates = append(ack.GetMates(), &pb.Mate{
				Text: line.Data.Lines.Text,
				Row:  uint32(line.Data.LineNumber),
				Hits: hits,
			})
		}
	}
}
