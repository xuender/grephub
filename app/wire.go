//go:build wireinject
// +build wireinject

package app

import (
	"github.com/google/wire"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search"
	"github.com/xuender/grephub/search/ag"
	"github.com/xuender/grephub/search/rg"
	"github.com/xuender/grephub/search/ugrep"
	"github.com/xuender/kit/oss"
)

func InitApp() *App {
	wire.Build(
		NewApp,
		pb.NewConfig,
		oss.NewProcInfo,
		search.NewService,
		ag.NewAg,
		rg.NewRg,
		ugrep.NewUgrep,
	)

	return &App{}
}
