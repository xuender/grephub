//go:build !windows

package search

import "os/exec"

func HideWindow(_ *exec.Cmd) {}
