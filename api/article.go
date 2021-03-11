package api

import (
	"fmt"

	"github.com/iminfinity/fatmug-backend/models"
)

// AddArticleToDB func
func AddArticleToDB(newArticle models.Article) {
	_, err := articlesCollection.InsertOne(ctx, newArticle)
	if err != nil {
		fmt.Println("Error adding user")
		return
	}
	fmt.Println("Add article to mongo")
}
