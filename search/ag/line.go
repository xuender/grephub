package ag

import (
	"strings"

	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/types"
)

func NewMate(text string) *pb.Mate {
	start := strings.Index(text, ";")
	end := strings.Index(text, ":")

	if start < 0 || end < 0 || end < start {
		return nil
	}

	row, err := types.ParseInteger[uint32](text[:start])
	if err != nil {
		return nil
	}

	return &pb.Mate{
		Text: text[end+1:],
		Row:  row,
		Hits: NewHits(text),
	}
}

func NewHits(text string) []*pb.Hit {
	end := strings.Index(text, ":")
	if end < 0 {
		end = len(text)
	}

	start := strings.Index(text, ";")
	if start > end || start < 0 {
		start = 0
	}

	cols := strings.Split(text[start+1:end], ",")
	hits := make([]*pb.Hit, len(cols))

	for idx, col := range cols {
		strs := strings.Split(col, " ")

		col, err := types.ParseInteger[uint32](strs[0])
		if err != nil {
			continue
		}

		length, err := types.ParseInteger[uint32](strs[1])
		if err != nil {
			continue
		}

		hits[idx] = &pb.Hit{
			Col: col,
			Len: length,
		}
	}

	return hits
}
