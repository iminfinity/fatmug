package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug/backend/api"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/add-new-user/{userId}", api.AddNewUser).Methods("POST")

	router.HandleFunc("/add-article/{userId}/", api.AddArticle).Methods("POST")
	router.HandleFunc("/update-article/{userId}/{articleId}", api.UpdateArticle).Methods("UPDATE")
	router.HandleFunc("/remove-article/{userId}/{articleId}", api.RemoveArticle).Methods("DELETE")

	router.HandleFunc("/get-user-articles/{userId}/", api.GetUserArticles).Methods("GET")

	router.HandleFunc("/get-articles/{pageNumber}/", api.GetArticles).Methods("GET")
	router.HandleFunc("/get-popular-articles", api.GetPopularArticles).Methods("GET")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
	})

	err := http.ListenAndServe(":8000", corsHandler.Handler(router))
	if err != nil {
		log.Fatal(err)
	}
}
