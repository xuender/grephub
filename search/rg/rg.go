package rg

import (
	"bufio"
	"encoding/json"
	"fmt"

	"github.com/samber/lo"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search/grep"
)

type Rg struct {
	grep.Grep
}

func NewRg() *Rg {
	ret := &Rg{}
	ret.Name = "rg"
	ret.Init()

	return ret
}

func (p *Rg) Cmd(query *pb.Query) (string, []string) {
	args := []string{"--json", query.GetPattern()}

	if query.GetMaxCount() > 0 {
		args = append(args, fmt.Sprintf("-m=%d", query.GetMaxCount()))
	}

	if len(query.GetRgTypes()) > 0 {
		args = append(args, lo.Map(
			query.GetRgTypes(),
			func(str string, _ int) string { return "-t" + str })...)
	}

	args = append(args, query.GetPaths()...)

	return p.Name, args
}

func (p *Rg) Search(_ *pb.Query, reader *bufio.Reader, acks chan<- *pb.Ack) {
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
