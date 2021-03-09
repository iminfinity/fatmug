package api

import (
	"fmt"
	"net/http"
)

// Check func
func Check(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(rw, "Hello world")
}
