import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
        const data = await res.json();

        console.log("MOVIE DATA:", data);

        setMovie(data);
      } catch (err) {
        console.log("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black text-red-500 min-h-screen flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-10">

      <div className="flex flex-col md:flex-row gap-10">

        {/* POSTER */}
        <img
          src={
            movie.poster ||
            "https://dummyimage.com/300x450/111/fff&text=No+Image"
          }
          alt={movie.title}
          className="w-72 rounded-lg shadow-lg object-cover"
        />

        {/* INFO */}
        <div className="space-y-3">

          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          <p className="text-gray-300">
            {movie.description}
          </p>

          <div className="mt-5 space-y-2">

            <p><b>Genre:</b> {movie.genre}</p>

            <p><b>Director:</b> {movie.director}</p>

            <p><b>Language:</b> {movie.language}</p>

            <p><b>Duration:</b> {movie.duration} min</p>

            <p><b>Release Date:</b> {movie.release_date}</p>

            <p><b>Rating:</b> ⭐ {movie.rating}</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MovieDetails;