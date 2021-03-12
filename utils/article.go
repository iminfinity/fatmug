package utils

import "github.com/iminfinity/fatmug-backend/models"

// FindIndexFromId func
func FindIndexFromId(articleId string, articles []models.Article) int {
	for index, item := range articles {
		if item.ArticleID == articleId {
			return index
		}
	}

	return -1
}
