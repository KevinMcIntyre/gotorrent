package main

import (
	"log"
	"net"
	"time"
	"encoding/json"
)

type Messsage struct {
	Id			int16
	Value      	string
}

func writeServer(c net.Conn) {
	var counter int16 = 1
	for {
		message := Messsage{counter, "Hello!"}
		encodedMesage, _ := json.Marshal(message);
		_, err := c.Write([]byte(encodedMesage))
		if err != nil {
			log.Fatal("write error:", err)
			break
		}
		counter++
		time.Sleep(500 * time.Millisecond)
	}
}

func main() {
	l, err := net.Listen("unix", "/tmp/gotorrent")
	if err != nil {
		log.Fatal("listen error:", err)
	}

	for {
		fd, err := l.Accept()
		if err != nil {
			log.Fatal("accept error:", err)
		}

		go writeServer(fd)
	}
}
