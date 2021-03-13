package models

// Article struct
type Article struct {
	ArticleID string `json:"articleId,omitempty" bson:"articleId,omitempty"`
	Writer    string `json:"writer,omitempty" bson:"writer,omitempty"`
	Heading   string `json:"heading,omitempty" bson:"heading,omitempty"`
	Content   string `json:"content,omitempty" bson:"content,omitempty"`
	Synopsis  string `json:"synopsis,omitempty" bson:"synopsis,omitempty"`
	ImageURL  string `json:"imageURL,omitempty" bson:"imageURL,omitempty"`
	CreatedAt string `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	ReadTime  int    `json:"readTime,omitempty" bson:"readTime,omitempty"`
	ViewCount int    `json:"viewCount,omitempty" bson:"viewCount,omitempty"`
}
