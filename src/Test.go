package main

import (
	"github.com/anacrolix/torrent"
	"log"
	"time"
	"strconv"
)

func main() {
	client := initClient(50007);
	defer client.Close()
	torrent, err := client.AddTorrentFromFile("../ubuntu.torrent")
	if err != nil {
		log.Panic(err)
	}
	<-torrent.GotInfo()
	go logProgress(&torrent)
	torrent.DownloadAll()
	client.WaitAll()
	log.Print("ermahgerd, torrent downloaded.")
}

func logProgress(torrent *torrent.Torrent) {
	totalBytes := float64(torrent.Length())
	for {
		complete := (float64(torrent.BytesCompleted()) / totalBytes) * float64(100)
		if complete == float64(100) {
			break
		}
		log.Printf("Torrent is %.1f complete.\n", complete)
		time.Sleep(time.Millisecond * 750)
	}
}

func initClient(port int) (*torrent.Client){
	portString := ":" + strconv.Itoa(port)
	log.Printf("Attempting to use port %s\n", portString)
	config := new(torrent.Config)
	config.ListenAddr = portString
	client, err := torrent.NewClient(config)
	if err != nil {
		log.Print(err);
		port = port + 1;
		log.Printf("Cannot use port :%d, attempting to connect to port :%d\n", (port-1), port);
		return initClient(port)
	} else {
		log.Printf("Using port :%d\n", port);
	}
	return client
}