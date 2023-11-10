package pb

import (
	"fmt"
)

func (p *Hit) Ack() string {
	return fmt.Sprintf("%d %d", p.GetCol(), p.GetLen())
}
