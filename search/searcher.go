package search

import (
	"bufio"

	"github.com/xuender/grephub/pb"
)

type Searcher interface {
	Cmd(query *pb.Query) (string, []string)
	Search(reader *bufio.Reader, acks chan<- *pb.Ack)
	Find() bool
}
