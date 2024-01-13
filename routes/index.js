// routes/index.js
const express = require("express");
const router = express.Router();
const imageRoute = require("./imageRoute"); // Import the imageRoute

// Use the imageRoute for handling image-related routes
router.use("/images", imageRoute);

// Add more routes if needed

module.exports = router;
