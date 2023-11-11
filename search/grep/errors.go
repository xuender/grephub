package grep

import "errors"

var (
	ErrNoPattern = errors.New("no pattern")
	ErrNoPath    = errors.New("no path")
	ErrNoSearch  = errors.New("no search")
)

type InstallError string

func (p InstallError) Error() string {
	return string(p)
}
