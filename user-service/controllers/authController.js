const User = require("../models/user-model");
const generateToken = require("../Utils/generatetoken.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userId: uuidv4(),
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = generateToken(user.userId);
    res.status(201).json({ message: "User Regeisterted successfully", userId: user.userId, token: token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ email });

    if (!name || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "invalid credentails" });
    }

    const token = generateToken(user.userId);
    res.status(201).json({ message: "login successfully", token });
  } catch (error) {
    next(error);
  }
};
