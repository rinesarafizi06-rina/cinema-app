import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GenrePage = () => {
  const { genre } = useParams();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();

      const filtered = data.filter(
        (m) => m.genre?.toLowerCase() === genre?.toLowerCase()
      );

      setMovies(filtered);
    };

    fetchMovies();
  }, [genre]);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl mb-6 capitalize">{genre} Movies</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="group">

              {/* WIDE POSTER */}
              <img
                src={
                  movie.poster
                    ? movie.poster
                    : "https://dummyimage.com/500x700/111/fff&text=No+Image"
                }
                alt={movie.title}
                className="w-full h-[480px] object-cover rounded-xl shadow-lg group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/500x700/111/fff&text=No+Image";
                }}
              />

              <h2 className="mt-3 text-sm font-semibold text-center">
                {movie.title}
              </h2>

            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default GenrePage;