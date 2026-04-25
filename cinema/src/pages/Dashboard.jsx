import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-lg shadow-lg text-center w-80">
        
        <h1 className="text-2xl font-bold mb-4">
          Welcome {user?.username || "User"} 👋
        </h1>

        <p className="mb-6 text-gray-400">
          You are logged in successfully
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;