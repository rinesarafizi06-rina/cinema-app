const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");

// GET MOVIES
router.get("/", (req, res) => {
  Movie.getAllMovies((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// ADD MOVIE
router.post("/", (req, res) => {
  const newMovie = req.body;

  Movie.addMovie(newMovie, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Movie added", id: result.insertId });
  });
});

module.exports = router;