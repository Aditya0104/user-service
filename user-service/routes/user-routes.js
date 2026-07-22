const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/authmiddleware");
const { updateUser, deleteUserById, getAllUser, getUserById } = require("../controllers/userControllers");

router.get("/getAllUser", getAllUser),
  router.get("/getUserById/:id", protectRoute, getUserById),
  router.put("/updateUser/:id", protectRoute, updateUser),
  router.delete("/deleteUserById/:id", protectRoute, deleteUserById);

module.exports = router;
