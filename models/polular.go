package models

// PopularArticles struct
type PopularArticles struct {
	ArticleId string `json:"articleId,omitempty" bson:"articleId,omitempty"`
	ViewCount int    `json:"viewCount,omitempty" bson:"viewCount,omitempty"`
}

// CurrentPopularArticles struct
type CurrentPopularArticles struct {
	CurrentArticles [4]PopularArticles `json:"currentArticles,omitempty" bson:"currentArticles,omitempty"`
}
