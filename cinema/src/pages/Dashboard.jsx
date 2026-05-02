import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ROLE CHECK
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1>Access denied ❌ Admin only</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded w-80 text-center">

        <h1 className="text-xl mb-2">
          Welcome {user.name} 👑
        </h1>

        <p className="text-gray-400 mb-4">
          Role: {user.role}
        </p>

        <button
          onClick={logout}
          className="w-full bg-red-600 py-2"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;