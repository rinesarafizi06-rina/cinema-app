import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";

const API_KEY = "0ff698c4e9bced87a9218cac2741aaf0";

const sliderMovies = [
  {
    title: "What’s New",
    desc: "Discover the latest movies",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  },
  {
    title: "Trending Now",
    desc: "Most watched movies",
    image:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330",
  },
  {
    title: "Cinema Experience",
    desc: "Watch in best quality",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  },
];

const months = [
  "All Months",
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const getMonthName = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { month: "long" });
};

const App = () => {
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("top");
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  const [topMovies, setTopMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [comingMovies, setComingMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderMovies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTopMovies(data.results.slice(0, 7)));

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setNowMovies(data.results.slice(0, 5)));

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const fixed = data.results.slice(0, 5).map((m, i) => ({
          ...m,
          release_date: `2026-${String(6 + i).padStart(2, "0")}-15`,
        }));
        setComingMovies(fixed);
      });
  }, []);

  const openMovie = (movie) => {
    setSelectedMovie(movie);

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovieDetails(data));
  };

  const getMovies = () => {
    let movies =
      filter === "top"
        ? topMovies
        : filter === "now"
        ? nowMovies
        : comingMovies;

    if (selectedMonth === "All Months") return movies;

    return movies.filter(
      (m) => getMonthName(m.release_date) === selectedMonth
    );
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      <Navbar />

      {/* HERO */}
      <div className="relative h-[45vh] sm:h-[55vh] md:h-[70vh] flex items-center justify-center mt-3 sm:mt-4">
        <img
          src={sliderMovies[index].image}
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center z-10 px-3 sm:px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-red-500">
            {sliderMovies[index].title}
          </h1>
          <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base">
            {sliderMovies[index].desc}
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-6 px-4 gap-4 relative">

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
          {["top", "now", "coming"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 sm:px-4 py-2 rounded text-xs sm:text-sm md:text-base ${
                filter === type ? "bg-red-600" : "bg-gray-700"
              }`}
            >
              {type === "top"
                ? "Top Movies"
                : type === "now"
                ? "Now Playing"
                : "Coming Soon"}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto flex justify-center md:absolute md:right-6 mt-2 md:mt-0">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-gray-800 px-3 py-2 rounded-lg text-xs sm:text-sm text-white w-full sm:w-auto"
          >
            {months.map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>
        </div>

      </div>

      {/* MOVIES */}
      <div className="p-4 sm:p-5 md:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mt-6 md:mt-10">

        {getMovies()?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => openMovie(movie)}
            className="cursor-pointer hover:scale-105 transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full h-[220px] sm:h-[300px] md:h-[420px] object-cover rounded-xl shadow-lg"
            />

            <h2 className="mt-2 text-white text-sm sm:text-base md:text-xl font-bold line-clamp-1">
              {movie.title}
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm">
              Release: {movie.release_date}
            </p>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedMovie && movieDetails && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-3 sm:p-4">

          <div className="bg-[#1f1f1f] w-full max-w-5xl rounded-xl p-4 sm:p-6 relative flex flex-col md:flex-row gap-4 sm:gap-6 overflow-y-auto max-h-[85vh]">

            <button
              onClick={() => {
                setSelectedMovie(null);
                setMovieDetails(null);
              }}
              className="absolute top-2 right-3 text-white text-xl"
            >
              ✕
            </button>

            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              className="w-full md:w-[260px] h-[300px] sm:h-[380px] object-cover rounded-xl mx-auto md:mx-0"
            />

            <div className="flex-1">

              <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-2">
                {movieDetails.title}
              </h2>

              <p className="text-gray-300 text-[11px] sm:text-sm md:text-base mb-3 sm:mb-4 max-h-[120px] sm:max-h-none overflow-y-auto leading-relaxed">
                {movieDetails.overview}
              </p>

              <div className="text-xs sm:text-sm text-gray-400 space-y-2">

                <p>
                  <span className="text-white font-bold">Genres:</span>{" "}
                  {movieDetails.genres?.map((g) => g.name).join(", ")}
                </p>

                <p>
                  <span className="text-white font-bold">Runtime:</span>{" "}
                  {movieDetails.runtime} min
                </p>

                <p>
                  <span className="text-white font-bold">Release:</span>{" "}
                  {movieDetails.release_date}
                </p>

                <p className="mt-3 text-white font-bold">
                  Halls available:
                </p>

                <ul className="list-disc ml-5 text-gray-300">
                  <li>Cinema Prishtina - Hall 1</li>
                  <li>Cinema Prishtina - Hall 2</li>
                  <li>Cinema Tirana - VIP Hall</li>
                </ul>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-10 bg-[#2b2b2b] px-6 py-6 text-gray-300 text-center text-[11px] sm:text-sm">
        <p className="text-gray-400">CinePlay • Movies • Cinema</p>
        <p>© {new Date().getFullYear()} CinePlay</p>
      </footer>

    </div>
  );
};

export default App;