// app.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
const bodyParser = require("body-parser");
const methodOverRide = require("method-override");
const ejs = require("ejs");
const path = require("path");
const imageController = require("./controllers/imageController");
const middleware = require("./middlewares/image.middleware");

const app = express();
const PORT = 5000 || process.env.PORT;

// ... middleware setup, body parser, etc.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.post("/images", middleware.single("image"), imageController.uploadImage);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverRide("_method"));
app.use(express.static("public"));

// Connect to MongoDB using dotenv
const MONGODB_URI = "mongodb://localhost:27017/imagedb";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB", error);
  });

// Set up routes
const indexRoute = require("./routes/index");
const imagesRoute = require("./routes/imageRoute");

app.use("/", indexRoute);
app.use("/images", imagesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
