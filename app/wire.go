//go:build wireinject
// +build wireinject

package app

import (
	"github.com/google/wire"
	"github.com/xuender/grephub/app/ag"
	"github.com/xuender/grephub/app/rg"
	"github.com/xuender/grephub/app/ugrep"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/kit/oss"
)

func InitApp() *App {
	wire.Build(
		NewApp,
		pb.NewConfig,
		oss.NewProcInfo,
		NewService,
		ag.NewAg,
		rg.NewRg,
		ugrep.NewUgrep,
	)

	return &App{}
}
