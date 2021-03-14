package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug-backend/models"
	"gopkg.in/mgo.v2/bson"
)

// AddArticleToDB func
func AddArticleToDB(newArticle models.Article) {
	_, err := articlesCollection.InsertOne(ctx, newArticle)
	if err != nil {
		fmt.Println("Error adding article")
		return
	}
	fmt.Println("Add article to mongo")
}

// UpdateArticleOnDB func
func UpdateArticleOnDB(updatedArticle models.Article) {
	var currentArticle models.Article
	err = articlesCollection.FindOne(ctx, bson.M{"articleId": updatedArticle.ArticleID}).Decode(&currentArticle)
	currentArticle.Heading = updatedArticle.Heading
	currentArticle.Content = updatedArticle.Content
	_, err := articlesCollection.UpdateOne(ctx, bson.M{"articleId": currentArticle.ArticleID}, bson.M{"$set": currentArticle})
	if err != nil {
		fmt.Println("Error updating article")
		return
	}
	fmt.Println("Updated article on articles collection")
}

// DeleteArticleOnDB func
func DeleteArticleOnDB(articleId string) {
	err := articlesCollection.FindOneAndDelete(ctx, bson.M{"articleId": articleId})
	if err != nil {
		fmt.Println("Error deleting article")
		return
	}
	fmt.Println("Delete article from articles collection")
}

func UpdateViewCount(rw http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	articleId := params["articleId"]
	var article models.Article
	err = articlesCollection.FindOne(ctx, bson.M{"articleId": articleId}).Decode(&article)
	if err != nil {
		http.Error(rw, "Error getting article", http.StatusInternalServerError)
		fmt.Println("Error getting article")
		return
	}
	article.ViewCount++
	_, err = articlesCollection.UpdateOne(ctx, bson.M{"articleId": articleId}, bson.M{"$set": article})
	if err != nil {
		http.Error(rw, "Error updating view count", http.StatusInternalServerError)
		fmt.Println("Failed updating view count")
		return
	}

	go updatePopularArticles()
	fmt.Fprintf(rw, "View Count updated")
	fmt.Println("View count updated")
}
