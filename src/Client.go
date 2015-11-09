package main

import (
	"io"
	"log"
	"net"
	"strconv"
	"time"
)

func reader(r io.Reader) {
	buf := make([]byte, 1024)
	for {
		n, err := r.Read(buf[:])
		if err != nil {
			return
		}
		println("Client got:", string(buf[0:n]))
	}
}

func main() {
	c, err := net.Dial("unix", "/tmp/gotorrent")
	if err != nil {
		panic(err)
	}
	defer c.Close()

	go reader(c)

	counter := 1
	for {
		_, err := c.Write([]byte(strconv.Itoa(counter)))
		if err != nil {
			log.Fatal("write error:", err)
			break
		}
		counter++
		time.Sleep(5 * time.Second)
	}
}
