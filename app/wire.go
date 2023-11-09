//go:build wireinject
// +build wireinject

package app

import (
	"github.com/google/wire"
	"github.com/xuender/agp/ag"
	"github.com/xuender/agp/pb"
	"github.com/xuender/gca"
)

func InitApp() *gca.App[*pb.Msg] {
	wire.Build(
		NewApp,
		ag.NewService,
		pb.NewConfig,
	)

	return gca.NewApp[*pb.Msg]()
}
