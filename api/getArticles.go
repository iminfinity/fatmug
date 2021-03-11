package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug/backend/models"
	"gopkg.in/mgo.v2/bson"
)

// GetArticles func
func GetArticles(rw http.ResponseWriter, r *http.Request) {
	var articles []models.Article
	cursor, err := articlesCollection.Find(ctx, bson.D{})
	if err != nil {
		http.Error(rw, "Error getting articles", http.StatusInternalServerError)
		fmt.Println("Error getting articles")
		return
	}
	for cursor.Next(ctx) {
		err = cursor.Decode(&articles[len(articles)-1])
		if err != nil {
			continue
		}
	}

	params := mux.Vars(r)
	pageNumber, err := strconv.Atoi(params["pageNumber"])
	if err != nil {
		http.Error(rw, "Error formating page number", http.StatusInternalServerError)
		fmt.Println("Error formating page number")
	}
	var currentArticles []models.Article

	for i := 0; i <= 10; i++ {
		currentArticles = append(currentArticles, articles[(pageNumber-1)*10+i])
	}

	json.NewEncoder(rw).Encode(currentArticles)
}

// GetPopularArticles func
func GetPopularArticles(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
