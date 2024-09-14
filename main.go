package main

import (
	"html/template"
	"log"
	"net/http"
)


type EditorPage struct {
	Title 	   string
} 

func NotesMD(w http.ResponseWriter, r *http.Request) {
	editorData := EditorPage{
		Title: 	  "Title",
	}

	templ := template.Must(template.ParseFiles("templates/index.html"))

	err := templ.Execute(w, editorData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.HandleFunc("/", NotesMD)

	log.Print("Starting server on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}