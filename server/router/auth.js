const express = require("express");
const { signupUser, loginUser, logoutUser } = require("../controller/User");
const checkUserToken = require("../controller/Auth");

const authRouter = express.Router();

// check auth
authRouter.route("/check_auth").get(checkUserToken);

// signup route
authRouter.route("/signup").post(signupUser);

// login route
authRouter.route("/login").post(loginUser);

// logout route
authRouter.route("/logout").post(logoutUser);

module.exports = authRouter;
