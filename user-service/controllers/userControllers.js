const User = require("../models/user-model");

// exports.getAllUser = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     page = parseInt(page);
//     limit = parseInt(limit);

//     const skip = (page - 1) * limit;
//     const total = User.countDocuments();

//     const user = User.find().select("-password").skip(skip).limit(limit);
//     res.status(200).json({
//       total,
//       page,
//       pages: Math.ceil(total / limit),
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// get user by id

exports.getAllUser = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const total = await User.countDocuments();

    const users = await User.find().select("-password").skip(skip).limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.params.id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

//  delete user by Id

exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

//  update user

// exports.updateUser = async (req, res, next) => {
//   try {
//     const { name, email } = req.body;

//     if (!name || !email) {
//       return res.status(404).json({ message: "Name and email is required" });
//     }

//     if (email) {
//       const existingUser = await User.findOne({ email });
//       if (existingUser && existingUser.userId !== req.params.userId) {
//         return res.status(400).json({ message: "email already in use" });
//       }
//     }

//     const updateUser = await User.findOneAndUpdate(
//       { userId: req.params.id },
//       { name: name, password: password },
//       { new: true, runValidators: true }
//     ).select("-password");
//     if (!updateUser) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "user updated successfully", updateUser });
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.userId !== req.params.id) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const updatedUser = await User.findOneAndUpdate({ userId: req.params.id }, { name, email }, { new: true, runValidators: true }).select(
      "-password"
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// “save() loads the document first, modifies it, then saves it, whereas findOneAndUpdate() performs an atomic operation in a single query.
//  So for direct updates, findOneAndUpdate() is more efficient.”

// save() → validates ✅
// findOneAndUpdate() → does NOT validate ❌

// 1. new: true
// 👉 Meaning:

// Return the updated document, not the old one
