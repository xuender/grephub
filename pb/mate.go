package pb

import (
	"fmt"
	"strings"

	"github.com/samber/lo"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/types"
)

func NewMate(text string) *Mate {
	start := strings.Index(text, ";")
	end := strings.Index(text, ":")

	return &Mate{
		Text: text[end+1:],
		Row:  los.Must(types.ParseInteger[uint32](text[:start])),
		Hits: NewHits(text),
	}
}

func (p *Mate) Ack() string {
	strs := lo.Map(p.GetHits(), func(h *Hit, _ int) string { return h.Ack() })

	return fmt.Sprintf("%d;%s:%s", p.GetRow(), strings.Join(strs, ","), p.GetText())
}
