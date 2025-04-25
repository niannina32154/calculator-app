package main

import (
	"log"
	"net/http"

	calcv1connect "calculatorbackend/gen/proto/calculator/v1/calculatorv1connect"
	"calculatorbackend/server"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	
	servicePath, handler := calcv1connect.NewCalculatorServiceHandler(&server.CalculatorServer{})
	mux.Handle(servicePath, handler)

	
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{http.MethodPost, http.MethodOptions},
		AllowedHeaders: []string{"Content-Type"},
	}).Handler(mux)

	log.Println("🚀 Server is running at http://localhost:8080")
	if err := http.ListenAndServe(":8080", corsHandler); err != nil {
		log.Fatal(err)
	}
}
