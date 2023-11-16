const express = require("express");
const { signupUser, loginUser, logoutUser } = require("../controller/User");

const authRouter = express.Router();

// signup route
authRouter.route("/signup").post(signupUser);

// login route
authRouter.route("/login").post(loginUser);

// logout route
authRouter.route("/logout").post(logoutUser);

module.exports = authRouter;
