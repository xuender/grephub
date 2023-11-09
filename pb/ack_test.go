package pb_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/xuender/agp/pb"
)

func TestNewAcks(t *testing.T) {
	t.Parallel()

	ass := assert.New(t)
	acks := pb.NewAcks(`:go.work.sum
85;24 4:cloud.google.com/go/notebooks v1.7.0/go.mod h1:PVlaDGfJgj1fl1S3dUwhFMXFgfYGhYQt2164xOMONmE=

:doc/test.txt
1;0 4:book
2;11 7,33 4,40 18:this is my boooook. Where is you book?  booooooooooooooook 3`)

	ass.Len(acks, 2)
	ass.Len(acks[0].GetMates(), 1)
	ass.Len(acks[1].GetMates(), 2)
	ass.Equal(uint32(85), acks[0].GetMates()[0].GetRow())
	ass.Equal(uint32(2), acks[1].GetMates()[1].GetRow())
	ass.Equal(uint32(11), acks[1].GetMates()[1].GetHits()[0].GetCol())
	ass.Equal(uint32(7), acks[1].GetMates()[1].GetHits()[0].GetLen())
}
