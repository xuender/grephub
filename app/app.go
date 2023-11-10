package app

import (
	"embed"

	"github.com/xuender/gca"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search"
)

//go:embed www
var www embed.FS

func NewApp[M *pb.Msg](
	ses *search.Service,
) *gca.App[*pb.Msg] {
	app := gca.NewApp[*pb.Msg]()

	app.Static(www, "www")
	app.NewMsg = func() *pb.Msg { return &pb.Msg{} }
	app.OnSay = ses.Say

	return app
}
