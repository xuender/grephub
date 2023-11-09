package app

import (
	"embed"

	"github.com/xuender/agp/ag"
	"github.com/xuender/agp/pb"
	"github.com/xuender/gca"
)

//go:embed www
var www embed.FS

func NewApp[M *pb.Msg](
	ags *ag.Service,
) *gca.App[*pb.Msg] {
	app := gca.NewApp[*pb.Msg]()

	app.Static(www, "www")
	app.NewMsg = func() *pb.Msg { return &pb.Msg{} }
	app.OnSay = ags.Say

	return app
}
