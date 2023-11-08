package ag

import (
	"github.com/gorilla/websocket"
	"github.com/xuender/ag-ui/pb"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

func Install(conn *websocket.Conn) bool {
	msg := &pb.Msg{
		Type:  pb.Type_alert,
		Alert: "brew install the_silver_searcher\nport install the_silver_searcher",
	}
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))

	return true
}
