package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/anacrolix/torrent"
	"log"
	"os"
	"strconv"
)

func main() {
	client := initClient(50007)
	defer client.Close()

	clientChan := make(chan ClientRequest)
	workerMap := make(map[int]*Worker)

	go listenToClient(clientChan)

	for {
		select {
		case clientRequest := <-clientChan:
			{
				switch clientRequest.Id {
				case "start-torrent":
					{
						request := StartTorrentRequest{}
						json.Unmarshal(*clientRequest.Body, &request)
						worker := Worker{}
						workerChan := make(chan string)

						worker.Id = request.Id
						worker.FilePath = request.Path
						worker.WorkerChan = &workerChan
						workerMap[worker.Id] = &worker

						go worker.Init(client, request.IsMagnet)

						break
					}
				case "stop-torrent":
					{
						request := StopTorrentRequest{}
						json.Unmarshal(*clientRequest.Body, &request)
						workerChan := *workerMap[request.Id].WorkerChan
						workerChan <- "stop"
						delete(workerMap, request.Id)
						break
					}
				default:
					{
						log.Println("Unknown id found in request: " + clientRequest.Id)
					}
				}
			}
		default:
			{
				continue
			}
		}
	}
}

func listenToClient(clientChan chan ClientRequest) {
	Stdin := bufio.NewReader(os.Stdin)
	for {
		request, err := Stdin.ReadBytes('\n')
		if err != nil {
			if err.Error() == "EOF" {
				log.Println("Exiting program")
				os.Exit(0)
			} else {
				log.Println("ERROR listening to client: \n" + err.Error())
			}
		}
		clientRequest := ClientRequest{}
		json.Unmarshal(request, &clientRequest)
		clientChan <- clientRequest
	}
}

func init() {
	logFile, err := os.OpenFile("gotorrent.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Printf(fmt.Sprintf("Error opening log file: %s \n", err))
	}
	defer logFile.Close()

	log.SetOutput(logFile)

	main()
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
