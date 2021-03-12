package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug-backend/models"
	"github.com/iminfinity/fatmug-backend/utils"
	"gopkg.in/mgo.v2/bson"
)

// GetUserArticles func
func GetUserArticles(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application-json")
	params := mux.Vars(r)
	userId := params["userId"]
	var user models.User
	err = usersCollection.FindOne(ctx, bson.M{"userId": userId}).Decode(&user)
	if err != nil {
		http.Error(rw, "Error getting user", http.StatusInternalServerError)
		fmt.Println("Error getting user")
		return
	}
	var userArticles []models.Article
	userArticles = user.Articles

	json.NewEncoder(rw).Encode(userArticles)
}

// AddArticle func
func AddArticle(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	params := mux.Vars(r)
	var user models.User
	userId := params["userId"]
	err = usersCollection.FindOne(ctx, bson.M{"userId": userId}).Decode(&user)
	if err != nil {
		http.Error(rw, "Error getting user", http.StatusInternalServerError)
		fmt.Println("Error getting user")
		return
	}

	var newArticle models.Article

	err = json.NewDecoder(r.Body).Decode(&newArticle)

	if err != nil {
		http.Error(rw, "Error decoding article", http.StatusInternalServerError)
		fmt.Println("Error decoding article")
		return
	}

	user.Articles = append(user.Articles, newArticle)

	_, err = usersCollection.UpdateOne(ctx, bson.M{"userId": userId}, bson.M{"$set": user})
	if err != nil {
		http.Error(rw, "Error saving user", http.StatusInternalServerError)
		fmt.Println("Error saving user")
		return
	}
	go AddArticleToDB(newArticle)
	fmt.Fprintf(rw, "Article saved to database successfully")
	fmt.Println("New article saved")
}

// UpdateArticle func
func UpdateArticle(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	params := mux.Vars(r)
	userId, articleId := params["userId"], params["articleId"]
	var updatedArticle models.Article
	var user models.User

	err = usersCollection.FindOne(ctx, bson.M{"userId": userId}).Decode(&user)
	if err != nil {
		http.Error(rw, "Error getting user", http.StatusInternalServerError)
		fmt.Println("Error getting user")
		return
	}

	err = json.NewDecoder(r.Body).Decode(&updatedArticle)
	if err != nil {
		http.Error(rw, "Error decoding request", http.StatusInternalServerError)
		fmt.Println("Error decoding request")
		return
	}

	var articles []models.Article
	articles = user.Articles
	index := utils.FindIndexFromId(articleId, articles)
	articles[index] = updatedArticle

	user.Articles = articles
	_, err = usersCollection.UpdateOne(ctx, bson.M{"userId": userId}, bson.M{"$set": user})
	if err != nil {
		http.Error(rw, "Error updating user", http.StatusInternalServerError)
		fmt.Println("Error updating user")
		return
	}

	fmt.Fprintf(rw, "Article updated")
	fmt.Println("Article updated")
}

// RemoveArticle func
func RemoveArticle(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	params := mux.Vars(r)
	userId, articleId := params["userId"], params["articleId"]
	var user models.User
	err = usersCollection.FindOne(ctx, bson.M{"userId": userId}).Decode(&user)
	if err != nil {
		http.Error(rw, "Error getting user", http.StatusInternalServerError)
		fmt.Println("Error getting user")
		return
	}
	var articles []models.Article
	articles = user.Articles
	index := utils.FindIndexFromId(articleId, articles)
	user.Articles = append(user.Articles[:index], user.Articles[index+1:]...)

	_, err = usersCollection.UpdateOne(ctx, bson.M{"userId": userId}, bson.M{"$set": user})
	if err != nil {
		http.Error(rw, "Error updating user", http.StatusInternalServerError)
		fmt.Println("Error updating user")
		return
	}

	fmt.Fprintf(rw, "Article Removed")
	fmt.Println("Article Removed")
}
