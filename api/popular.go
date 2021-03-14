package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/iminfinity/fatmug-backend/models"
	"gopkg.in/mgo.v2/bson"
)

// GetPopularArticles func
func GetPopularArticles(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	var popular [4]models.PopularArticles

	cursor, err := popularArticlesCollection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(rw, "Error getting popular articles", http.StatusInternalServerError)
		fmt.Println("Error getting popular article")
		return
	}
	index := 0
	for cursor.Next(ctx) {
		var popularArticle models.PopularArticles
		err = cursor.Decode(&popularArticle)
		if err != nil {
			continue
		}
		popular[index] = popularArticle
		index++
	}
	var currentPopularArticle models.CurrentPopularArticles
	currentPopularArticle.CurrentArticles = popular
	json.NewEncoder(rw).Encode(currentPopularArticle)
	fmt.Println("Success getting popular articles")
}

func updatePopularArticles() {
	total, err := articlesCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		fmt.Println("Error counting documents")
		return
	}
	if total <= 4 {
		fmt.Println("Too Few articles")
		return
	}
	cursor, err := articlesCollection.Find(ctx, bson.M{})
	var mostPopular [4]models.PopularArticles
	count := 0
	for cursor.Next(ctx) {
		var currentArticle models.Article
		err = cursor.Decode(&currentArticle)
		if err != nil {
			continue
		}
		if count < 4 {
			var popular models.PopularArticles
			popular.ArticleId = currentArticle.ArticleID
			popular.ViewCount = currentArticle.ViewCount
			mostPopular[count] = popular
			count++
			continue
		}
		checkIfMaxThenUpdate(mostPopular, currentArticle.ViewCount, currentArticle.ArticleID)
	}
	saveMostPopularArtiles(mostPopular)
}

func checkIfMaxThenUpdate(mostPopular [4]models.PopularArticles, currentViewCount int, currentArticleId string) {
	for index, item := range mostPopular {
		if currentViewCount >= item.ViewCount {
			if currentArticleId == item.ArticleId {
				mostPopular[index].ViewCount = currentViewCount
			} else {
				mostPopular[index].ArticleId = currentArticleId
				mostPopular[index].ViewCount = currentViewCount
			}
		}
	}
}

func saveMostPopularArtiles(mostPopular [4]models.PopularArticles) {
	err = popularArticlesCollection.Drop(ctx)
	if err != nil {
		fmt.Println("Error dropping collection")
	}
	// should use Collection.InsertMany()
	for _, item := range mostPopular {
		_, err = popularArticlesCollection.InsertOne(ctx, item)
		fmt.Println(item.ViewCount)
		if err != nil {
			continue
		}
	}

	fmt.Println("Saved most popular articles")
}
