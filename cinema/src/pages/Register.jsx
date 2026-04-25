import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return false;
    }

    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain 1 uppercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain 1 number");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      // 🔥 SAVE LOGIN STATE (KY ËSHTË FIXI)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registered successfully!");

      // clear fields
      setUsername("");
      setEmail("");
      setPassword("");

      // 🚀 GO TO HOME
      window.location.href = "/home";

    } catch (error) {
      console.log("ERROR:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-8 rounded-lg w-80 shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-black border border-gray-700 rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="w-full bg-green-600 py-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;