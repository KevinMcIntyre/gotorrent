package main

import (
	"fmt"
	"github.com/anacrolix/torrent"
	"log"
	"net"
	"strconv"
)

func main() {


	// Connect to unix socket
	listener, err := net.Listen("unix", "/tmp/gotorrent")
	if err != nil {
		log.Fatal("listen error:", err)
	}
	defer listener.Close()

	// Listen to socket through a channel
	socketChan := make(chan string)

	go listenToSocket(listener, socketChan)
}

func listenToSocket(listener net.Listener, socketChan chan string) {
	for {
		socket, err := listener.Accept()
		if err != nil {
			log.Fatal("accept error:", err)
		}

		defer socket.Close() // This might be bad

		go socketListener(socket, socketChan)
	}
}

func socketListener(socket net.Conn, socketChan chan<- string) {
	for {
		buf := make([]byte, 1024)
		nr, err := socket.Read(buf)
		if err != nil {
			return
		}
		message := string(buf[0:nr])

		switch message {
		case "start":
			{
				socket.Write([]byte("received start command\n"))
			}
		case "stop":
			{
				socket.Write([]byte("received stop command\n"))
			}
		default:
			{
				socket.Write([]byte(fmt.Sprintln("received: %s", message)))
			}
		}
	}
}

func initClient(port int) *torrent.Client {
	portString := ":" + strconv.Itoa(port)
	log.Printf("Attempting to use port %s\n", portString)
	config := new(torrent.Config)
	config.ListenAddr = portString
	client, err := torrent.NewClient(config)
	if err != nil {
		log.Print(err)
		port = port + 1
		log.Printf("Cannot use port :%d, attempting to connect to port :%d\n", (port - 1), port)
		return initClient(port)
	} else {
		log.Printf("Using port :%d\n", port)
	}
	return client
}
