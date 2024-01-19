// core
const express = require("express");
const authRouter = express.Router();

// controllers
const {
  checkUserToken,
  logoutUser,
  register,
  loginUser,
} = require("../controller/auth.controller");

// middleware
const {
  validateRegisterInput,
} = require("../middleware/validation.middleware");
// check auth
// authRouter.route("/check_auth").get(checkUserToken);

// signup route
authRouter.route("/signup").post(validateRegisterInput, register);

// login route
authRouter.route("/login").post(loginUser);

// logout route
authRouter.route("/logout").post(logoutUser);

module.exports = authRouter;
