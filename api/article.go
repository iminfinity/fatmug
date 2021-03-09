package api

import (
	"fmt"
	"net/http"
)

// AddArticle func
func AddArticle(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}

// UpdateArticle func
func UpdateArticle(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}

// RemoveArticle func
func RemoveArticle(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
