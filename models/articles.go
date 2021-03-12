package models

// CurrentArticles struct
type CurrentArticles struct {
	Articles []Article `json:"currentArticles,omitempty" bson:"currentArticles,omitempty"`
}
