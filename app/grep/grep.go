package grep

import (
	"os"
	"os/exec"
	"path/filepath"

	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
)

type Grep struct {
	Name string
	ok   bool
}

func NewGrep() *Grep {
	ret := &Grep{Name: "grep"}
	ret.Init()

	return ret
}

func (p *Grep) Init() {
	if oss.IsWindows() {
		p.Name += ".exe"
		if _, err := exec.LookPath(p.Name); err != nil {
			file := los.Must(os.Executable())
			dir := filepath.Dir(file)
			// download
			p.Name = filepath.Join(dir, p.Name)
		}
	}

	p.Ready()
}

func (p *Grep) Ready() bool {
	if p.ok {
		return true
	}

	_, err := exec.LookPath(p.Name)
	p.ok = err == nil

	return p.ok
}
