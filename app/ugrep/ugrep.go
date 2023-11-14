package ugrep

import (
	"bufio"
	"fmt"
	"io"
	"strings"

	"github.com/goccy/go-json"
	"github.com/xuender/grephub/app/grep"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/los"
)

type Ugrep struct {
	grep.Grep
}

func NewUgrep() *Ugrep {
	ret := &Ugrep{}
	ret.Name = "ugrep"
	ret.Init()

	return ret
}

func (p *Ugrep) Cmd(query *pb.Query) (string, []string) {
	args := []string{"--json", query.GetPattern(), "-r", "--ignore-files", "--no-hidden", "-I"}

	if query.GetMaxCount() > 0 {
		args = append(args, fmt.Sprintf("-znum=%d", query.GetMaxCount()))
	}

	if len(query.GetUgTypes()) > 0 {
		args = append(args, "-t", strings.Join(query.GetUgTypes(), ","))
	}

	args = append(args,
		query.GetPaths()...)

	return p.Name, args
}

func (p *Ugrep) Search(query *pb.Query, input *bufio.Reader, acks chan<- *pb.Ack) {
	var (
		data    = los.Must(io.ReadAll(input))
		items   = []Data{}
		length  = uint32(len(query.GetPattern()))
		pattern = []rune(query.GetPattern())
	)

	los.Must0(json.Unmarshal(data, &items))

	for _, item := range items {
		ack := &pb.Ack{
			File: item.File,
		}

		ack.Mates = make([]*pb.Mate, len(item.Matches))

		for idx, match := range item.Matches {
			str := strings.TrimSpace(match.Match)
			col := los.IndexOf([]rune(str), pattern)

			ack.Mates[idx] = &pb.Mate{
				Text: str,
				Row:  uint32(match.Line),
				Hits: []*pb.Hit{
					{
						Len: length,
						Col: uint32(col),
					},
				},
			}
		}

		acks <- ack
	}
}
