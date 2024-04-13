// core
const express = require("express");
const authRouter = express.Router();

// controllers
const authCtrl = require("../controller/auth.controller");

// middleware
const validMiddle = require("../middleware/validation.middleware");

// login route
authRouter
  .route("/login")
  .post(validMiddle.validateLoginInput, authCtrl.loginUser);

// logout route
authRouter.route("/logout").post(authCtrl.logoutUser);

module.exports = authRouter;
