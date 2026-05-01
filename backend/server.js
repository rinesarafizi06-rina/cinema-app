const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
    
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));

// ROOT
app.get("/", (req, res) => {
  res.send("MSSQL API is running...");
});

// 404
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});