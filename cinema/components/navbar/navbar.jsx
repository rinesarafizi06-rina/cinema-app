import React, { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const menuItems = [
    "Home",
    "Halls",
    "Genres",
    "Events",
    "Reservations",
    "About Us",
  ];

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-black text-white shadow-md relative z-50">

        {/* LEFT SIDE (LOGO + MENU) */}
        <div className="flex items-center gap-10 flex-1">

          {/* LOGO */}
          <div className="text-2xl font-bold text-red-500">
            CinePlay
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-sm">
            {menuItems.map((item) => (
              <li key={item} className="hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}
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
          <button className="hidden md:block hover:text-red-500">
            Login
          </button>

          {/* REGISTER */}
          <button className="hidden md:block bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Register
          </button>

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

        {/* MENU */}
        <div className="flex flex-col gap-6 px-6 mt-6 text-lg font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setOpenMenu(false)}
              className="text-white hover:text-black transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* AUTH */}
        <div className="mt-10 px-6 flex flex-col gap-4">
          <button className="bg-white text-red-600 py-2 rounded font-semibold">
            Login
          </button>
          <button className="border border-white py-2 rounded font-semibold">
            Register
          </button>
        </div>

      </div>
    </>
  );
};

export default Navbar;