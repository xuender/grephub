//go:build wireinject
// +build wireinject

package app

import (
	"github.com/google/wire"
	"github.com/xuender/gca"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search"
	"github.com/xuender/grephub/search/ag"
	"github.com/xuender/grephub/search/rg"
	"github.com/xuender/kit/oss"
)

func InitApp() *gca.App[*pb.Msg] {
	wire.Build(
		NewApp,
		pb.NewConfig,
		oss.NewProcInfo,
		search.NewService,
		ag.NewAg,
		rg.NewRg,
	)

	return gca.NewApp[*pb.Msg]()
}
