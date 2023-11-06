package pb

import "strings"

func NewAcks(text string) []*Ack {
	if text == "" {
		return []*Ack{}
	}

	acks := []*Ack{}
	ack := &Ack{}

	for _, str := range strings.Split(text, "\n") {
		str = strings.TrimSpace(str)
		if str == "" {
			continue
		}

		if str[0] == ':' {
			ack = &Ack{File: str[1:]}
			acks = append(acks, ack)

			continue
		}

		ack.Mates = append(ack.GetMates(), NewMate(str))
	}

	return acks
}
