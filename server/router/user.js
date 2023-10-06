const express = require("express");
const { getAllUser, getUser, createUser } = require("../controller/User");
const { getUserSetting } = require("../controller/Setting");

const userRouter = express.Router();

// getting user info
userRouter.get("/", getAllUser).post("/", createUser);

// getting single user info
userRouter.get("/:id", getUser);

// getting settings
userRouter.get("/:id/setting", getUserSetting);
module.exports = { userRouter };
