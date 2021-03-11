package models

// User struct
type User struct {
	UserID    string    `json:"userId,omitempty" bson:"userId,omitempty"`
	FirstName string    `json:"firstName,omitempty" bson:"firstName,omitempty"`
	LastName  string    `json:"lastName,omitempty" bson:"lastName,omitempty"`
	Articles  []Article `json:"articles,omitempty" bson:"articles,omitempty"`
}
