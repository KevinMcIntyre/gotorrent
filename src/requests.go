package main

import "encoding/json"

type ClientRequest struct {
	Id   string           `json:"id"`
	Body *json.RawMessage `json:"body"`
}

type StartTorrentRequest struct {
	Id       int    `json: "id"`
	Path     string `json: "path"`
	IsMagnet bool   `json: "isMagnet"`
}

type StopTorrentRequest struct {
	Id int `json: "id"`
}
