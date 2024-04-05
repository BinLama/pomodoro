// core
const express = require("express");
const authRouter = express.Router();

// controllers
const authCtrl = require("../controller/auth.controller");
const userCtrl = require("../controller/user.controller");

// middleware
const validMiddle = require("../middleware/validation.middleware");
const authMiddle = require("../middleware/auth.middleware");

// check auth

// signup route
// authRouter.route("/signup").post(validateRegisterInput, register);
authRouter
  .route("/authenticate")
  .get(authMiddle.validateTokenAndGetUser, userCtrl.getUser);

// login route
authRouter
  .route("/login")
  .post(validMiddle.validateLoginInput, authCtrl.loginUser);

// logout route
authRouter.route("/logout").post(authCtrl.logoutUser);

module.exports = authRouter;
