package app

import (
	"bufio"

	"github.com/xuender/grephub/pb"
)

type Searcher interface {
	Cmd(query *pb.Query) (string, []string)
	Search(query *pb.Query, reader *bufio.Reader, acks chan<- *pb.Ack)
	Install() error
}
