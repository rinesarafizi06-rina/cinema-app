import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-black text-white shadow-md relative z-50">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-10 flex-1">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-red-500">
            CinePlay
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-sm items-center">

            <li>
              <Link to="/" className="hover:text-red-500">Home</Link>
            </li>

            <li>
              <Link to="/halls" className="hover:text-red-500">Halls</Link>
            </li>

            {/* GENRES DROPDOWN */}
            <li className="relative group">

              <span className="hover:text-red-500 cursor-pointer">
                Genres
              </span>

              <ul className="absolute hidden group-hover:block bg-black mt-2 rounded shadow-lg min-w-[140px]">

                <li>
                  <Link to="/genres/action" className="block px-4 py-2 hover:bg-red-600">
                    Action
                  </Link>
                </li>

                <li>
                  <Link to="/genres/comedy" className="block px-4 py-2 hover:bg-red-600">
                    Comedy
                  </Link>
                </li>

                <li>
                  <Link to="/genres/drama" className="block px-4 py-2 hover:bg-red-600">
                    Drama
                  </Link>
                </li>

                <li>
                  <Link to="/genres/horror" className="block px-4 py-2 hover:bg-red-600">
                    Horror
                  </Link>
                </li>

              </ul>

            </li>

            <li>
              <Link to="/events" className="hover:text-red-500">Events</Link>
            </li>

            <li>
              <Link to="/reservations" className="hover:text-red-500">Reservations</Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-red-500">About Us</Link>
            </li>

          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="flex items-center">
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
                className="w-6 h-6"
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
                className="ml-2 px-3 py-1 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
          </div>

          {/* LOGIN */}
          <Link to="/login" className="hidden md:block hover:text-red-500">
            Login
          </Link>

          {/* REGISTER */}
          <Link to="/register" className="hidden md:block bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Register
          </Link>

          {/* HAMBURGER */}
          <button onClick={() => setOpenMenu(true)} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
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
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-red-600 text-white z-50 transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpenMenu(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className="flex flex-col gap-6 px-6 mt-6 text-lg font-medium">

          <Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link to="/halls" onClick={() => setOpenMenu(false)}>Halls</Link>
          <Link to="/genres/action" onClick={() => setOpenMenu(false)}>Action</Link>
          <Link to="/genres/comedy" onClick={() => setOpenMenu(false)}>Comedy</Link>
          <Link to="/genres/drama" onClick={() => setOpenMenu(false)}>Drama</Link>
          <Link to="/events" onClick={() => setOpenMenu(false)}>Events</Link>
          <Link to="/reservations" onClick={() => setOpenMenu(false)}>Reservations</Link>
          <Link to="/about" onClick={() => setOpenMenu(false)}>About Us</Link>

        </div>

        {/* AUTH */}
        <div className="mt-10 px-6 flex flex-col gap-4">
          <Link to="/login" className="bg-white text-red-600 py-2 rounded font-semibold text-center">
            Login
          </Link>
          <Link to="/register" className="border border-white py-2 rounded font-semibold text-center">
            Register
          </Link>
        </div>

      </div>
    </>
  );
};

export default Navbar;