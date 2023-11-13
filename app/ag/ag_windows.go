package ag

import (
	_ "embed"

	"github.com/xuender/grephub/app/grep"
)

var _cmds = [...]string{
	"download https://github.com/JFLarvoire/the_silver_searcher/releases/download/2.2.5-Windows/ag-2021-11-14-2.2.5-x86.zip",
	// winget
	`winget install "The Silver Searcher"`,
	// Chocolatey
	"choco install ag",
	// MSYS2
	"pacman -S mingw-w64-{i686,x86_64}-ag",
}

func (p *Ag) Install() error {
	if p.Ready() {
		return nil
	}

	return grep.InstallError(grep.FindLib(_cmds[:]))
}
