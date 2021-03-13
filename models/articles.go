package models

// CurrentArticles struct
type CurrentArticles struct {
	Articles []Article `json:"currentArticles,omitempty" bson:"currentArticles,omitempty"`
}

// TotalArticlesCount struct
type TotalArticlesCount struct {
	Total int64 `json:"total,omitempty" bson:"total,omitempty"`
}
