package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/iminfinity/fatmug-backend/models"
)

// AddNewUser func
func AddNewUser(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Add("content-type", "application/json")
	var newUser models.User
	params := mux.Vars(r)
	err = json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(rw, "Error decoding request", http.StatusInternalServerError)
		fmt.Println("Error adding new user")
		return
	}
	newUser.UserID = params["userId"]
	_, err := usersCollection.InsertOne(ctx, newUser)
	fmt.Println(newUser)
	if err != nil {
		http.Error(rw, "Error saving user", http.StatusInternalServerError)
		fmt.Println("Error saving user")
		fmt.Println(err)
		return
	}

	fmt.Fprintf(rw, "User saved to database successfully")
	fmt.Println("New user saved")
}
