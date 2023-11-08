package ag

import (
	_ "embed"
	"os"
	"os/exec"
	"syscall"

	"github.com/gorilla/websocket"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

//go:embed ag.exe
var _ag []byte

func Install(conn *websocket.Conn) bool {
	if createAg() == nil {
		return false
	}

	msg := &pb.Msg{
		Type:  pb.Type_alert,
		Alert: `winget install "The Silver Searcher"`,
	}
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	return true
}

func createAg() error {
	file := los.Must(os.Create(_cmd))
	defer file.Close()

	_, err := file.Write(_ag)

	return err
}

func HideWindow(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
}
