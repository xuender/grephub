package ag

import (
	"bufio"

	"github.com/samber/lo"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search/grep"
	"github.com/xuender/kit/types"
)

type Ag struct {
	grep.Grep
}

func NewAg() *Ag {
	ret := &Ag{}
	ret.Name = "ag"
	ret.Init()

	return ret
}

func (p *Ag) Cmd(query *pb.Query) (string, []string) {
	args := []string{"--ackmate", query.GetPattern()}

	if query.GetMaxCount() > 0 {
		args = append(args, "--max-count", types.Itoa(query.GetMaxCount()))
	}

	if len(query.GetAgTypes()) > 0 {
		args = append(args, lo.Map(
			query.GetAgTypes(),
			func(str string, _ int) string { return "--" + str })...)
	}

	args = append(args, query.GetPaths()...)

	return p.Name, args
}

func (p *Ag) Search(_ *pb.Query, reader *bufio.Reader, acks chan<- *pb.Ack) {
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
