package ag

import "errors"

var (
	ErrNoPattern = errors.New("no pattern")
	ErrNoPath    = errors.New("no path")
	ErrNoSearch  = errors.New("no search")
)
