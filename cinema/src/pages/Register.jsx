import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });

      const data = await res.json();
      console.log("SUCCESS:", data);

      // pastro inputet pas suksesit
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-black border border-gray-700 rounded-md"
        />

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
          onClick={handleRegister}
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;