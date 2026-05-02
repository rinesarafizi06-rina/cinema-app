const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/users", auth, adminOnly, async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, role FROM users"
  );

  res.json(result.rows);
});

module.exports = router;