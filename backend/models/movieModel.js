const { pool } = require("../config/db");

// GET ALL
const getAllMovies = async () => {
  const result = await pool.query('SELECT * FROM "Movies" ORDER BY id ASC');
  return result.rows;
};

// GET BY ID
const getMovieById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM "Movies" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// GET BY GENRE
const getMoviesByGenre = async (genre) => {
  const result = await pool.query(
    'SELECT * FROM "Movies" WHERE genre = $1',
    [genre]
  );
  return result.rows;
};

// 🔍 SEARCH
const searchMovies = async (q) => {
  const result = await pool.query(
    `SELECT * FROM "Movies"
     WHERE title ILIKE $1
     OR genre ILIKE $1
     LIMIT 10`,
    [`%${q}%`]
  );

  return result.rows;
};

// ADD
const addMovie = async (movie) => {
  const sql = `
    INSERT INTO "Movies"
    (id, title, description, genre, duration, director, language, release_date, poster, rating)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [
    movie.title,
    movie.description,
    movie.genre,
    movie.duration,
    movie.director,
    movie.language,
    movie.release_date,
    movie.poster,
    movie.rating,
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  searchMovies,
  addMovie,
};