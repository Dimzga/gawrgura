package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"github.com/gorilla/mux"
)

type ApiResponse struct {
	DownloadUrl string `json:"download_url"`
}

func downloadTikTokHandler(w http.ResponseWriter, r *http.Request) {
	// Ambil URL TikTok dari parameter query
	query := r.URL.Query()
	videoURL := query.Get("url")

	if videoURL == "" {
		http.Error(w, "URL parameter is required", http.StatusBadRequest)
		return
	}

	// Tambahkan parameter untuk mengunduh video dengan kualitas HD
	apiURL := fmt.Sprintf("https://www.tikwm.com/api/?url=%s&hd=1", videoURL)

	// Membuat request ke API TikWM
	resp, err := http.Get(apiURL)
	if err != nil {
		http.Error(w, "Error contacting TikWM API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Membaca response dari API TikWM
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Error reading API response", http.StatusInternalServerError)
		return
	}

	// Parse JSON response dari API TikWM
	var apiResponse ApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		http.Error(w, "Error parsing API response", http.StatusInternalServerError)
		return
	}

	// Kirim response ke frontend dalam format JSON
	w.Header().Set("Content-Type", "application/json")
	if apiResponse.DownloadUrl == "" {
		http.Error(w, "Download URL not found", http.StatusNotFound)
		return
	}

	// Mengembalikan URL video yang dapat diunduh
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Download successful",
		"url":     apiResponse.DownloadUrl,
	})
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/download", downloadTikTokHandler).Methods("GET")

	http.Handle("/", r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	fmt.Println("Server is running on port", port)
	http.ListenAndServe(":"+port, nil)
}
