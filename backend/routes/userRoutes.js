const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  FetchUsers,
  updateUserProfile,
} = require("../controllers/userController");

const userRouter = express.Router()





userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/", FetchUsers);
userRouter.post("/profile", authMiddleware, updateUserProfile);

module.exports = userRouter