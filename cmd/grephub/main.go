package main

import (
	"flag"
	"fmt"
	_ "net/http/pprof" // nolint
	"os"

	"github.com/xuender/gca"
	"github.com/xuender/grephub/app"
)

func main() {
	var port uint64

	flag.Uint64Var(&port, "port", 0, "server port")
	flag.Usage = usage
	flag.Parse()

	app.InitApp().Run(int(port), gca.NewOption().Maximized(true))
}

func usage() {
	fmt.Fprintf(os.Stderr, "grephub\n\n")
	fmt.Fprintf(os.Stderr, "agui.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
