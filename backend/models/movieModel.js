const db = require("../config/db");

// GET ALL MOVIES
const getAllMovies = (callback) => {
  db.query("SELECT * FROM movies", callback);
};

// ADD MOVIE
const addMovie = (movie, callback) => {
  const sql =
    "INSERT INTO movies (title, genre, description, year, poster_path) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [movie.title, movie.genre, movie.description, movie.year, movie.poster_path],
    callback
  );
};

module.exports = { getAllMovies, addMovie };