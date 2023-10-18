const express = require("express");
const {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/User");
const { getUserSetting } = require("../controller/Setting");

const userRouter = express.Router();

// getting user info
userRouter.route("/").get(getAllUser).post(createUser);

// getting single user info
userRouter.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

// getting settings
userRouter.get("/:id/setting", getUserSetting);

module.exports = { userRouter };
