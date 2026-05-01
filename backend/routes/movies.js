const express = require("express");
const router = express.Router();

const movieModel = require("../models/movieModel");

// 🔍 SEARCH (DUHET SIPER)
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await movieModel.searchMovies(q);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const movies = await movieModel.getAllMovies();
  res.json(movies);
});

// GENRE
router.get("/genre/:genre", async (req, res) => {
  const movies = await movieModel.getMoviesByGenre(req.params.genre);
  res.json(movies);
});

// BY ID
router.get("/:id", async (req, res) => {
  const movie = await movieModel.getMovieById(req.params.id);
  res.json(movie);
});

// ADD
router.post("/", async (req, res) => {
  const movie = await movieModel.addMovie(req.body);
  res.json(movie);
});

module.exports = router;