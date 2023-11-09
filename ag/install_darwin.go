package ag

import (
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/xuender/agp/pb"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

func Install(conn *websocket.Conn) bool {
	msg := &pb.Msg{
		Type:  pb.Type_alert,
		Value: "brew install the_silver_searcher\nport install the_silver_searcher",
	}
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	return true
}

func HideWindow(_ *exec.Cmd) {
}
