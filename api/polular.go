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
	fmt.Println(cursor)
	for cursor.Next(ctx) {
		if index >= 4 {
			break
		}
		var popularArticle models.PopularArticles
		err = cursor.Decode(&popularArticle)
		if err != nil {
			continue
		}
		fmt.Println(popularArticle)
		popular[index] = popularArticle
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
	var mostPolular [4]models.PopularArticles
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
			mostPolular[count] = popular
			count++
			if total <= 4 && count == 4 {
				saveMostPolularArtiles(mostPolular)
				return
			}
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
			break
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
