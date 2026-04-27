const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// 🎬 GET MOVIES (WITH GENRE FILTER)
router.get("/", async (req, res) => {
  try {
    const { genre } = req.query;

    let filter = {};

    if (genre) {
      filter.genre = { $regex: new RegExp(genre, "i") };
    }

    const movies = await Movie.find(filter);

    res.json(movies);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;