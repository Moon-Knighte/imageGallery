const { response } = require("express");
const Image = require("../models/imageModel");

//Display all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.render("index", { images });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Display a specific image
const getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    response.render("imgDetails", { image });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a new image || Add new image
const uploadImage = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file || !req.file.path) {
      return res.status(400).send("No file or invalid file format");
    }

    const { title, description } = req.body;
    const imagePath = req.file.path;

    const newImage = new Image({ title, description, imagePath });
    await newImage.save();

    res.redirect("/images");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Update an existing image
const updateImage = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      }
    );
    res.json(updatedImage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Delete an existing image
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    await Image.findByIdAndDelete(id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllImages,
  getImageById,
  uploadImage,
  updateImage,
  deleteImage,
};
