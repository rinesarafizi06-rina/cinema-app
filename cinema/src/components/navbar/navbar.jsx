import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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
      <nav className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md relative z-50">

        {/* LOGO + MENU */}
        <div className="flex items-center gap-10">

          <div className="text-2xl font-bold text-red-500 tracking-wide">
            CinePlay
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 text-sm items-center">
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
                      <ul className="absolute top-8 left-0 bg-[#111] border border-gray-800 rounded-md w-40 py-2 shadow-lg">
                        {genres.map((g) => (
                          <li
                            key={g}
                            className="px-4 py-2 text-sm hover:bg-red-600 hover:text-white cursor-pointer transition"
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
        <div className="flex items-center gap-5">

          {/* SEARCH ICON */}
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="hover:text-red-500 transition"
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
              className="px-3 py-1 text-sm bg-[#111] border border-gray-700 rounded-md outline-none focus:border-red-500 transition"
            />
          )}

          {/* LOGIN */}
          <Link to="/login" className="hidden md:block text-sm hover:text-red-500 transition">
           Login
          </Link>

          {/* REGISTER */}
          <Link to="/register" className="hidden md:block text-sm bg-red-600 px-4 py-1.5 rounded-md hover:bg-red-700 transition">
           Register
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#111] text-white z-50 transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpenMenu(false)}
            className="hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-6 px-6 mt-6 text-lg">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setOpenMenu(false)}
              className="hover:text-red-500 transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* AUTH */}
        <div className="mt-10 px-6 flex flex-col gap-4">
          <button className="bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition">
            Login
          </button>
          <button className="border border-gray-500 py-2 rounded-md font-medium hover:border-red-500 transition">
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;