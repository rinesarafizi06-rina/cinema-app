const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  tmdbId: Number,
  poster_path: String,
  genre: String,
  description: String,
  year: Number
});

module.exports = mongoose.model("Movie", movieSchema);