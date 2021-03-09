package api

import (
	"fmt"
	"net/http"
)

// GetUserArticles func
func GetUserArticles(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}

// GetArticles func
func GetArticles(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}

// GetPopularArticles func
func GetPopularArticles(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
