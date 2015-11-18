package main

import (
	"github.com/anacrolix/torrent"
	"strconv"
)

type TorrentResponse struct {
	Id            int    `json:"id"`
	Name          string `json:"name"`
	BytesComplete string `json:"bytesComplete"`
	Size          string `json:"sizeInBytes"`
	FilePath      string `json:"filePath"`
	ActivePeers   string `json:"activePeers"`
	TotalPeers    string `json:"totalPeers"`
	Download      string `json:"download"`
	Upload        string `json:"upload"`
}

func NewTorrentResponse(id int, filePath string, torrent torrent.Torrent) (*TorrentResponse){
	torrentResponse := TorrentResponse{}
	torrentResponse.Id = id
	torrentResponse.Name = torrent.DisplayName
	torrentResponse.BytesComplete = strconv.FormatInt(torrent.BytesCompleted(), 10)
	torrentResponse.Size = strconv.FormatInt(torrent.Length(), 10)
	torrentResponse.FilePath = filePath
	torrentResponse.ActivePeers = strconv.Itoa(len(torrent.Conns))
	torrentResponse.TotalPeers = strconv.Itoa(len(torrent.Peers))
	torrentResponse.Download = "0"
	torrentResponse.Upload = "0"

	return &torrentResponse
}
