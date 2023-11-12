package app

import (
	"embed"
	"fmt"
	"log"
	"log/slog"
	"math/rand"
	"net"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/websocket"
	webview "github.com/webview/webview_go"
	"github.com/xuender/gca"
	"github.com/xuender/grephub/pb"
	"github.com/xuender/grephub/search"
	"github.com/xuender/kit/los"
	"google.golang.org/protobuf/proto"
)

//go:embed www
var www embed.FS

type App struct {
	upGrader websocket.Upgrader
	ses      *search.Service
}

func NewApp(
	ses *search.Service,
) *App {
	// app.Static(www, "www")
	// app.OnSay = ses.Say

	http.HandleFunc("/", gca.StaticHandler(www, "www"))

	return &App{
		upGrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
		ses: ses,
	}
}

func (p *App) ws(writer http.ResponseWriter, request *http.Request) {
	conn, err := p.upGrader.Upgrade(writer, request, nil)
	if err != nil {
		return
	}

	defer func() {
		conn.Close()
	}()

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		if mt != websocket.BinaryMessage {
			slog.Info(string(message))

			continue
		}

		msg := &pb.Msg{}
		if err := proto.Unmarshal(message, msg); err != nil {
			log.Println(err)

			continue
		}

		p.ses.Say(msg, conn)
	}
}

func getAddr(port int) string {
	if min := 1000; port < min {
		port = RandomPort()
	}

	return fmt.Sprintf("127.0.0.1:%d", port)
}

// RandomPort 随机可用的端口号.
func RandomPort() int {
	if old, err := strconv.Atoi(os.Getenv("GCA_PORT")); err == nil && old > 1000 {
		return old
	}

	const (
		min = 1000
		max = 9000
	)

	// nolint: gosec
	port := rand.Intn(max) + min

	for {
		if conn, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", port)); err == nil {
			conn.Close()

			break
		}
		// nolint: gosec
		port = rand.Intn(max) + min
	}

	os.Setenv("GCA_PORT", strconv.Itoa(port))

	return port
}

func (p *App) Run(port int) {
	addr := getAddr(port)

	http.HandleFunc("/ws", p.ws)
	// nolint: gosec
	go func() {
		los.Must0(http.ListenAndServe(addr, nil))
	}()

	w := webview.New(false)
	defer w.Destroy()
	w.SetTitle("Basic Example")
	w.SetSize(480, 320, webview.HintNone)
	// w.SetHtml("Thanks for using webview!")
	w.Navigate("http://" + addr)
	w.Run()
}
