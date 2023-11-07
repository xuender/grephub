package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/xuender/ag-ui/app"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/gca"
)

func main() {
	env := pb.NewEnv()

	flag.Uint64Var(&env.Port, "port", env.GetPort(), "server port")
	flag.StringVar(&env.Upgrade, "upgrade", env.GetUpgrade(), "upgrade file")
	flag.Usage = usage
	flag.Parse()

	app.InitApp().Run(int(env.GetPort()), env.GetUpgrade(), gca.NewOption().Maximized(true))
}

func usage() {
	fmt.Fprintf(os.Stderr, "ag-ui\n\n")
	fmt.Fprintf(os.Stderr, "agui.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
