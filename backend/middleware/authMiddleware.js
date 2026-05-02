const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;