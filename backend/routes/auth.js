const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserByEmail,
} = require("../models/user");


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await getUserByEmail(email);
    if (exists) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashed);

    res.json({
      msg: "User registered",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;