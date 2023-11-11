package grep

import "errors"

var ErrNoPattern = errors.New("no pattern")

type InstallError string

func (p InstallError) Error() string {
	return string(p)
}
