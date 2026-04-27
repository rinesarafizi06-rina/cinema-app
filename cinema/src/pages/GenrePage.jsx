import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const GenrePage = () => {
  const { genre } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:5000/api/movies?genre=${genre}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();
        setMovies(data);

      } catch (err) {
        console.log(err);
        setError("Something went wrong while fetching movies");
      } finally {
        setLoading(false);
      }
    };

    if (genre) fetchMovies();
  }, [genre]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-red-500 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8">

      <h1 className="text-3xl mb-6 capitalize">
        {genre} Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {movies.map((movie) => (
            
            <div key={movie._id} className="group">

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://dummyimage.com/300x450/111/fff&text=No+Image"
                }
                alt={movie.title}
                className="w-full h-72 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x450/111/fff&text=No+Image";
                }}
              />

              <h2 className="mt-2 text-sm font-semibold">
                {movie.title}
              </h2>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default GenrePage;