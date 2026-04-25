import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname === "/dashboard") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />   {/* 🔥 ADD KJO */}
        <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;