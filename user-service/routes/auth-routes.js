const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/register-user", register);
router.post("/login-user", login);

module.exports = router;
