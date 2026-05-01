import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GenrePage from "./pages/GenrePage";
import ReservationPage from "./pages/ReservationPage";
import MovieDetails from "./pages/MovieDetails";

// COMPONENTS
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // redirect manual (optional safety)
  useEffect(() => {
    if (!token && location.pathname === "/dashboard") {
      window.location.href = "/login";
    }
  }, [location.pathname, token]);

  return (
    <>
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* AUTH */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        {/* GENRES */}
        <Route path="/genres/:genre" element={<GenrePage />} />

        {/* 🎬 MOVIE DETAILS (IMPORTANT) */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* RESERVATION */}
        <Route path="/reservation" element={<ReservationPage />} />

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;