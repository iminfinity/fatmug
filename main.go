package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug-backend/api"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/add-new-user/{userId}", api.AddNewUser).Methods("POST")

	router.HandleFunc("/get-user-data/{userId}", api.GetUserData).Methods("GET")

	router.HandleFunc("/add-article/{userId}", api.AddArticle).Methods("POST")
	router.HandleFunc("/update-article/{userId}/{articleId}", api.UpdateArticle).Methods("POST")
	router.HandleFunc("/remove-article/{userId}/{articleId}", api.RemoveArticle).Methods("DELETE")

	router.HandleFunc("/get-user-articles/{userId}", api.GetUserArticles).Methods("GET")

	router.HandleFunc("/get-article/{articleId}", api.GetArticle).Methods("GET")
	router.HandleFunc("/get-articles/{pageNumber}", api.GetArticles).Methods("GET")
	router.HandleFunc("/get-popular-articles", api.GetPopularArticles).Methods("GET")

	router.HandleFunc("/update-view-count/{articleId}", api.UpdateViewCount).Methods("POST")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "https://fatmug.vercel.app/"},
		AllowedMethods: []string{"GET", "POST", "DELETE"},
	})

	port := os.Getenv("PORT")
	if port == "" {
		fmt.Println("$PORT not set")
	}

	fmt.Println("GO server running")
	err := http.ListenAndServe(":"+port, corsHandler.Handler(router))
	if err != nil {
		log.Fatal(err)
	}

}
