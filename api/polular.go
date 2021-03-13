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
	var popular models.CurrentArticles
	cursor, err := popularArticlesCollection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(rw, "Error getting popular articles", http.StatusInternalServerError)
		fmt.Println("Error getting popular article")
	}
	for cursor.Next(ctx) {
		var article models.Article
		err = cursor.Decode(&article)
		if err != nil {
			continue
		}
		popular.Articles = append(popular.Articles, article)
	}

	json.NewEncoder(rw).Encode(popular)
	fmt.Println("Success getting popular articles")
}

func updatePopularArticles() {
	count, err := articlesCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		fmt.Println("Error counting documents")
		return
	}
	if count <= 4 {
		fmt.Println("Too Few articles")
		return
	}
	cursor, err := articlesCollection.Find(ctx, bson.M{})
	var mostPolular [4]models.PopularArticles
	for cursor.Next(ctx) {
		var currentArticle models.Article
		err = cursor.Decode(&currentArticle)
		if err != nil {
			continue
		}
		checkIfMaxThenUpdate(mostPolular, currentArticle.ViewCount, currentArticle.ArticleID)
	}

	saveMostPolularArtiles(mostPolular)
}

func checkIfMaxThenUpdate(mostPolular [4]models.PopularArticles, currentViewCount int, currentArticleId string) {
	for index, item := range mostPolular {
		if item.ViewCount > currentViewCount {
			mostPolular[index].ArticleId = currentArticleId
			mostPolular[index].ViewCount = currentViewCount
		}
	}
}

func saveMostPolularArtiles(mostPolular [4]models.PopularArticles) {
	err = popularArticlesCollection.Drop(ctx)
	if err != nil {
		fmt.Println("Error dropping collection")
	}
	// should use Collection.InsertMany()
	for _, item := range mostPolular {
		_, err = popularArticlesCollection.InsertOne(ctx, item)
		if err != nil {
			continue
		}
	}

	fmt.Println("Saved most popular articles")
}
