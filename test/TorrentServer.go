package main

import (
	"log"
	"net"
	"strconv"
	"time"
	"fmt"
)

func server(socket net.Conn) {
	stopWork := make(chan bool)
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
				go work(socket, stopWork)
			}
		case "stop":
			{
				stopWork <- true
				socket.Write([]byte("received stop command\n"))
			}
		default:
			{
				socket.Write([]byte(fmt.Sprintln("received: %s", message)))
			}
		}
	}
}

func work(socket net.Conn, stop chan bool) {
	quit := make(chan bool)
	workerStopped := make(chan bool);
	go worker(socket, quit, workerStopped)

	WorkLoop:
	for {
		select {
		case <-stop:
			{
				quit <- true
				if (<- workerStopped) {
					break WorkLoop;
				}
			}
		case <- workerStopped:
			{
				break WorkLoop;
			}
		default:
			{
				quit <- false
			}
		}
	}

	socket.Write([]byte("stopped\n"));
}

func worker(socket net.Conn, quit chan bool, hasQuit chan bool) {
	for i := 0; i < 10; i++ {
		stop := <- quit
		if (!stop) {
			socket.Write([]byte(strconv.Itoa(i) + "\n"))
			time.Sleep(250 * time.Millisecond);
		} else {
			break;
		}
	}
	socket.Write([]byte("stopping\n"));
	hasQuit <- true
}

func main() {
	listener, err := net.Listen("unix", "/tmp/gotorrent")
	if err != nil {
		log.Fatal("listen error:", err)
	}

	for {
		socket, err := listener.Accept()
		if err != nil {
			log.Fatal("accept error:", err)
		}

		go server(socket)
	}
}
