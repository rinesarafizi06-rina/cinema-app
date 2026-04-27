import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./ProtectedRoute";
import GenrePage from "./pages/GenrePage";
import ReservationPage from "./pages/ReservationPage";

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname === "/dashboard") {
      window.location.href = "/login";
    }
  }, [location.pathname, token]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        <Route path="/genres/:genre" element={<GenrePage />} />

        {/* RESERVATION ROUTE */}
        <Route path="/reservation" element={<ReservationPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;