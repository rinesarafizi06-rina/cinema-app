import Movie from "../models/Movie.js";

// GET all movies (with optional genre filter)
export const getMovies = async (req, res) => {
  try {
    const { genre } = req.query;

    let filter = {};

    // Filter by genre (case-insensitive)
    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    const movies = await Movie.find(filter);

    res.status(200).json(movies);
  } catch (error) {
    console.log("Error fetching movies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE movie
export const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);

    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating movie" });
  }
};

// DELETE movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting movie" });
  }
};