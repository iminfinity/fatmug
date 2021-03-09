package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug/backend/api"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", api.Check).Methods("GET")

	err := http.ListenAndServe(":8080", router)

	if err != nil {
		fmt.Println("Error")
	}
}
