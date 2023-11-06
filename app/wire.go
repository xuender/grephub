//go:build wireinject
// +build wireinject

package app

import (
	"gitee.com/xuender/gca"
	"github.com/google/wire"
	"github.com/xuender/ag-ui/ag"
	"github.com/xuender/ag-ui/pb"
)

func InitApp() *gca.App[*pb.Msg] {
	wire.Build(
		NewApp,
		ag.NewService,
	)

	return gca.NewApp[*pb.Msg]()
}
