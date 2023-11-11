package ugrep

import (
	"bufio"
	"encoding/csv"
	"errors"
	"fmt"
	"io"
	"strings"

	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search/grep"
	"github.com/xuender/kit/types"
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
	args := []string{"--csv", "-k", query.GetPattern()}

	if query.GetMaxCount() > 0 {
		args = append(args, fmt.Sprintf("-znum=%d", query.GetMaxCount()))
	}

	if len(query.GetUgTypes()) > 0 {
		args = append(args, "-t", strings.Join(query.GetUgTypes(), ","))
	}

	args = append(args, query.GetPaths()...)

	return p.Name, args
}

func (p *Ugrep) Search(query *pb.Query, input *bufio.Reader, acks chan<- *pb.Ack) {
	var (
		ack    *pb.Ack
		reader = csv.NewReader(input)
		length = uint32(len(query.GetPattern()))
		file   = ""
	)

	for {
		val, err := reader.Read()
		if errors.Is(err, io.EOF) {
			break
		}

		if file != val[0] {
			if ack != nil {
				acks <- ack
			}

			ack = &pb.Ack{File: val[0], Mates: []*pb.Mate{}}
			file = val[0]
		}

		row, _ := types.ParseInteger[uint32](val[1])
		col, _ := types.ParseInteger[uint32](val[2])
		mate := &pb.Mate{Text: val[3], Row: row, Hits: []*pb.Hit{
			{Col: col - 1, Len: length},
		}}
		ack.Mates = append(ack.GetMates(), mate)
	}

	if ack != nil && len(ack.GetMates()) > 0 {
		acks <- ack
	}
}
