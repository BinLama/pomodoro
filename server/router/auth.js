const express = require("express");
const { signupUser, loginUser } = require("../controller/User");

const authRouter = express.Router();

// signup route
authRouter.route("/signup").post(signupUser);

// login route
authRouter.route("/login").post(loginUser);

module.exports = { authRouter };
