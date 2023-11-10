package pb

import (
	"fmt"
	"strings"

	"github.com/samber/lo"
)

func (p *Mate) Ack() string {
	strs := lo.Map(p.GetHits(), func(h *Hit, _ int) string { return h.Ack() })

	return fmt.Sprintf("%d;%s:%s", p.GetRow(), strings.Join(strs, ","), p.GetText())
}
