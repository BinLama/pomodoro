// core
const express = require("express");
const authRouter = express.Router();

// controllers
const {
  logoutUser,
  register,
  loginUser,
} = require("../controller/auth.controller");

// middleware
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/validation.middleware");
const authenticateUser = require("../middleware/auth.middleware");

// check auth
authRouter.route("/check_auth").get(authenticateUser);

// signup route
authRouter.route("/signup").post(validateRegisterInput, register);

// login route
authRouter.route("/login").post(validateLoginInput, loginUser);

// logout route
authRouter.route("/logout").post(authenticateUser, logoutUser);

module.exports = authRouter;
