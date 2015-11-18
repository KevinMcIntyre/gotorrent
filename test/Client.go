package main

import (
	"fmt"
	"encoding/json"
)

type FileRequest struct {
	Id   int    `json: "id"`
	Path string    `json: "path"`
}

func main() {
	jsonBytes := []byte(`{"id":23,"path":" /Users/Bob/Documents/test.txt"}`);

	requestObj := FileRequest{}
	err := json.Unmarshal(jsonBytes, &requestObj)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("TEST MARSHALLING TO STRUCT: ")
	fmt.Printf("ID IS : %d\n", requestObj.id);
	fmt.Println("PATH IS :" + requestObj.path);

	fmt.Println("TEST MARSHALLING TO GENERIC MAP: ")
	objMap := make(map[string]interface{})
	err = json.Unmarshal(jsonBytes, &objMap)
	if err != nil {
		fmt.Println(err)
	}
	for k, v := range objMap {
		fmt.Println(k)
		fmt.Println(v)
	}
}