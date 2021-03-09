package api

import (
	"fmt"
	"net/http"
)

// AddNewUser func
func AddNewUser(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
