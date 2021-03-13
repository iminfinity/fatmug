package api

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jasonlvhit/gocron"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var ctx context.Context
var fatmugDatabase *mongo.Database
var usersCollection *mongo.Collection
var articlesCollection *mongo.Collection
var popularArticlesCollection *mongo.Collection
var err error

func init() {
	mongoURI := os.Getenv("FATMUG_MONGO_URI")
	client, err = mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		fmt.Println("Error Connecting to MongoDB Atlas")
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	// defer client.Disconnect(ctx)
	if err != nil {
		fmt.Println("Error in connection to mongo cluster")
		log.Fatal(err)
	}

	fatmugDatabase = client.Database("fatmug")
	usersCollection = fatmugDatabase.Collection("users")
	articlesCollection = fatmugDatabase.Collection("articles")
	popularArticlesCollection = fatmugDatabase.Collection("popularArticles")

	fmt.Println("MongoDb running")
	gocron.Every(25).Minutes().Do(updatePopularArticles) // After 25 min update popular articles
}
