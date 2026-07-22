const { json } = require("express");
const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = protectRoute;
