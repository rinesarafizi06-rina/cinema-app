import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,      
          email,
          password
        })
      });

      const data = await res.json();
      console.log("REGISTER:", data);

      if (!res.ok) {
        alert(data.msg || "Server error");
        return;
      }

      alert("Registered successfully!");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-8 rounded w-80">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 bg-black border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-black border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-black border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 py-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;