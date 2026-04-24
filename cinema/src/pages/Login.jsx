import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      // nëse kthehet token
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token saved!");
      }

      // pastro inputet
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-black border border-gray-700 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 bg-black border border-gray-700 rounded-md"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;