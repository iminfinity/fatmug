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

	// will use mongo provided methods
	for i := 0; i <= 10; i++ {
		if (pageNumber-1)*10+i == len(articles) {
			break
		}
		currentArticles = append(currentArticles, articles[(pageNumber-1)*10+i])
	}
	var responseArticles models.CurrentArticles
	responseArticles.Articles = currentArticles
	json.NewEncoder(rw).Encode(responseArticles)

	fmt.Println("Get articles success")
	go updatePopularArticles()
}

// GetArticle func
func GetArticle(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	var article models.Article
	params := mux.Vars(r)
	articleId := params["articleId"]
	err = articlesCollection.FindOne(ctx, bson.M{"articleId": articleId}).Decode(&article)
	if err != nil {
		http.Error(rw, "Error getting article", http.StatusInternalServerError)
		fmt.Println("Error getting article")
		return
	}

	json.NewEncoder(rw).Encode(article)
	fmt.Println("Get article success")
}

// GetTotalArticlesCount func
func GetTotalArticlesCount(rw http.ResponseWriter, r *http.Request) {
	total, err := articlesCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		http.Error(rw, "Error getting articles count", http.StatusInternalServerError)
		fmt.Println("Error getting articles count")
		return
	}
	var totalArticlesCount models.TotalArticlesCount
	totalArticlesCount.Total = total

	json.NewEncoder(rw).Encode(totalArticlesCount)
	fmt.Println("Get articles count success")
}
