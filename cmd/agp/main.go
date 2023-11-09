package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/xuender/agp/app"
	"github.com/xuender/gca"
)

func main() {
	var port uint64

	flag.Uint64Var(&port, "port", 0, "server port")
	flag.Usage = usage
	flag.Parse()

	app.InitApp().Run(int(port), gca.NewOption().Maximized(true))
}

func usage() {
	fmt.Fprintf(os.Stderr, "agp\n\n")
	fmt.Fprintf(os.Stderr, "agui.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
