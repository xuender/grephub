package ag_test

import (
	"fmt"

	"github.com/xuender/grephub/search/ag"
)

func ExampleNewMate() {
	fmt.Println(ag.NewMate("26;12 2,18 2:   github.com/goccy/go-json v0.10.2 // indirect").Ack())

	// Output:
	// 26;12 2,18 2:   github.com/goccy/go-json v0.10.2 // indirect
}
