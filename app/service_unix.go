//go:build !windows

package app

import "os/exec"

func HideWindow(_ *exec.Cmd) {}
