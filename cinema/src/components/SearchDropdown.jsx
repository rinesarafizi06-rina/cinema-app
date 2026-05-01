import { Link } from "react-router-dom";

const SearchDropdown = ({ results, setResults, setQuery, setOpenSearch }) => {

  if (!results || results.length === 0) return null;

  return (
    <div className="absolute top-10 left-0 w-80 bg-[#111] border border-gray-800 rounded-md z-50 shadow-lg max-h-96 overflow-y-auto">

      {results.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          className="flex gap-3 px-3 py-2 hover:bg-red-600"
          onClick={() => {
            setResults([]);
            setQuery("");
            setOpenSearch(false);
          }}
        >
          <img
            src={movie.poster || "https://dummyimage.com/50x70"}
            className="w-10 h-14 object-cover rounded"
          />

          <div>
            <p className="text-sm font-bold">{movie.title}</p>
            <p className="text-xs text-gray-400 line-clamp-2">
              {movie.description}
            </p>
          </div>

        </Link>
      ))}

    </div>
  );
};

export default SearchDropdown;