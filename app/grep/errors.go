package grep

import "errors"

var (
	ErrNoPattern  = errors.New("no pattern")
	ErrNoSearcher = errors.New("no searcher")
)

type InstallError string

func (p InstallError) Error() string {
	return string(p)
}
