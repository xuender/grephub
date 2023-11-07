package pb

import (
	"fmt"
	"strings"

	"github.com/samber/lo"
	"github.com/xuender/kit/types"
)

func NewMate(text string) *Mate {
	start := strings.Index(text, ";")
	end := strings.Index(text, ":")

	if start < 0 || end < 0 || end < start {
		return nil
	}

	row, err := types.ParseInteger[uint32](text[:start])
	if err != nil {
		return nil
	}

	return &Mate{
		Text: text[end+1:],
		Row:  row,
		Hits: NewHits(text),
	}
}

func (p *Mate) Ack() string {
	strs := lo.Map(p.GetHits(), func(h *Hit, _ int) string { return h.Ack() })

	return fmt.Sprintf("%d;%s:%s", p.GetRow(), strings.Join(strs, ","), p.GetText())
}
