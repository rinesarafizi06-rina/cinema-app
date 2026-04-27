const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET ALL MOVIES (already ke)
router.get("/", async (req, res) => {
  try {
    const { genre } = req.query;

    let filter = {};
    if (genre) {
      filter.genre = new RegExp(`^${genre}$`, "i");
    }

    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 SEARCH ROUTE
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json([]);

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } }
      ]
    }).limit(10);

    res.json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error searching movies" });
  }
});

module.exports = router;