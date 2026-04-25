import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    "Home",
    "Halls",
    "Genres",
    "Events",
    "Reservations",
    "About Us",
  ];

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

  return (
    <>
      <nav className="flex items-center justify-between bg-black text-white px-4 py-4 shadow-md">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <div className="text-2xl font-bold text-red-500">
            CinePlay
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-sm items-center">

            {menuItems.map((item) => {

              if (item === "Genres") {
                return (
                  <li key={item} className="relative">

                    <button
                      onClick={() => setOpenGenres(!openGenres)}
                      className="hover:text-red-500 transition"
                    >
                      Genres
                    </button>

                    {openGenres && (
                      <ul className="absolute top-8 left-0 bg-[#111] border border-gray-800 rounded-md w-40 py-2 z-50">
                        {genres.map((g) => (
                          <li
                            key={g}
                            className="px-4 py-2 text-sm hover:bg-red-600 cursor-pointer"
                          >
                            {g}
                          </li>
                        ))}
                      </ul>
                    )}

                  </li>
                );
              }

              return (
                <li
                  key={item}
                  className="hover:text-red-500 cursor-pointer transition"
                >
                  {item}
                </li>
              );
            })}

          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH ICON */}
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

          {/* SEARCH INPUT */}
          {openSearch && (
            <input
              type="text"
              placeholder="Search movies..."
              className="px-2 py-1 text-sm bg-[#111] border border-gray-700 rounded-md outline-none"
            />
          )}

          {/* AUTH */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden md:block text-sm hover:text-red-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden md:block text-sm bg-red-600 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}

          {/* HAMBURGER MOBILE */}
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* OVERLAY */}
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#111] text-white z-50 transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpenMenu(false)}>✕</button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-6 px-6 mt-6 text-lg">

          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setOpenMenu(false)}
              className="hover:text-red-500"
            >
              {item}
            </a>
          ))}

        </div>

        {/* AUTH MOBILE */}
        <div className="mt-10 px-6 flex flex-col gap-4">

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-white text-black py-2 text-center rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-gray-500 py-2 text-center rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 py-2 rounded"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default Navbar;