package grep

import (
	"os/exec"
	"strings"
)

func FindLib(cmds []string) string {
	for _, lib := range cmds {
		cmd := strings.Split(lib, " ")[0]
		if _, err := exec.LookPath(cmd); err == nil {
			return lib
		}
	}

	return cmds[0]
}
