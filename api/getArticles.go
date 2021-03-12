package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug-backend/models"
	"gopkg.in/mgo.v2/bson"
)

// GetArticles func
func GetArticles(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	var articles []models.Article
	cursor, err := articlesCollection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(rw, "Error getting articles", http.StatusInternalServerError)
		fmt.Println("Error getting articles")
		return
	}
	for cursor.Next(ctx) {
		var article models.Article
		err = cursor.Decode(&article)
		articles = append(articles, article)
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

	if len(articles) <= 10 {
		currentArticles = articles
	} else {
		for i := 0; i <= 10; i++ {
			currentArticles = append(currentArticles, articles[(pageNumber-1)*10+i])
		}
	}
	var responseArticles models.CurrentArticles
	responseArticles.Articles = currentArticles
	json.NewEncoder(rw).Encode(responseArticles)
}

// GetPopularArticles func
func GetPopularArticles(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
