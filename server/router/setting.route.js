const express = require("express");
const { getUserSetting, updateUserSetting } = require("../controller/Setting");

const settingRouter = express.Router();

settingRouter.get("/", getUserSetting).patch("/:id", updateUserSetting);

module.exports = settingRouter;