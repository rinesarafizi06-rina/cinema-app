import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchDropdown from "../SearchDropdown";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

  // 🔥 SEARCH FIXED
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/search?q=${encodeURIComponent(value)}`
      );

      const data = await res.json();

      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setResults([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    "Home",
    "Halls",
    "Genres",
    "Events",
    "Reservations",
    "About Us",
  ];

  return (
    <nav className="flex items-center justify-between bg-black text-white px-4 py-4 shadow-md">

      {/* LEFT */}
      <div className="flex items-center gap-8">
        <div className="text-2xl font-bold text-red-500">
          CinePlay
        </div>

        <ul className="hidden md:flex gap-6 text-sm items-center">
          {menuItems.map((item) => {
            if (item === "Genres") {
              return (
                <li key={item} className="relative">
                  <button
                    onClick={() => setOpenGenres(!openGenres)}
                    className="hover:text-red-500"
                  >
                    Genres
                  </button>

                  {openGenres && (
                    <ul className="absolute top-8 left-0 bg-[#111] border border-gray-800 rounded-md w-40 py-2 z-50">
                      {genres.map((g) => (
                        <li key={g}>
                          <Link
                            to={`/genres/${g}`}
                            className="block px-4 py-2 hover:bg-red-600"
                            onClick={() => setOpenGenres(false)}
                          >
                            {g}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item} className="hover:text-red-500">
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : item === "Reservations"
                      ? "/reservation"
                      : `/${item.toLowerCase()}`
                  }
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div ref={searchRef} className="relative flex items-center">

          {/* 🔥 REAL SVG ICON */}
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {openSearch && (
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="ml-2 px-3 py-1 text-sm bg-[#111] border border-gray-700 rounded-md text-white outline-none"
            />
          )}

          {/* SEARCH DROPDOWN */}
          {query.trim() !== "" && (
            <SearchDropdown
              results={results}
              setResults={setResults}
              setQuery={setQuery}
              setOpenSearch={setOpenSearch}
            />
          )}

        </div>

        {/* AUTH */}
        {!token ? (
          <>
            <Link to="/login" className="hidden md:block hover:text-red-500">
              Login
            </Link>

            <Link
              to="/register"
              className="hidden md:block bg-red-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;