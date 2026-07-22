const express = require("express");
const cors = require("cors");
const errorHandling = require("./middleware/errormiddleware");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  return res.json({ msg: "Hello from the server" });
});

app.use(errorHandling);

module.exports = app;
