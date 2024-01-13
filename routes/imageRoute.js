const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

// Display all images
router.get("/", imageController.getAllImages);

// Display a specific image
router.get("/:id", imageController.getImageById);

// Add a new image
router.post("/", imageController.uploadImage);

//Update an existing image
router.put("/:id", imageController.updateImage);

//Delete an existing image
router.delete("/:id", imageController.deleteImage);

module.exports = router;
