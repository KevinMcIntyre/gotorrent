package main

import (
	"github.com/anacrolix/torrent"
	"fmt"
	"encoding/json"
	"log"
	"time"
)

type Worker struct {
	Id         int
	FilePath   string
	WorkerChan *chan string
	Torrent    *torrent.Torrent
	Err			error
}

func (worker Worker) Init(client *torrent.Client, isMagnet bool) {
	if (isMagnet) {
		log.Println("MAGNETS!")
	} else {
		torrent, err := client.AddTorrentFromFile(worker.FilePath)
		if err != nil {
			worker.Err = err;
		}
		worker.Torrent = &torrent
		<-torrent.GotInfo()

		torrentResponse := NewTorrentResponse(worker.Id, worker.FilePath, *worker.Torrent)

		response, _ := json.Marshal(torrentResponse)

		fmt.Println(string(response));

		go worker.Work();
	}
}

func (worker Worker) Work() {
	worker.Torrent.DownloadAll();
	for {
		time.Sleep(time.Millisecond * 750)

		torrentResponse := NewTorrentResponse(worker.Id, worker.FilePath, *worker.Torrent)

		response, _ := json.Marshal(torrentResponse)

		fmt.Println(string(response));

		if worker.Torrent.BytesCompleted() == worker.Torrent.Length() {
			break;
		}
	}
}