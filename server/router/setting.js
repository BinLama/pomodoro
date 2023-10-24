const express = require("express");
const { getUserSetting, updateUserSetting } = require("../controller/Setting");

const requireAuth = require("../middleware/requireAuth");

const settingRouter = express.Router();

// require auth for all task route
settingRouter.use(requireAuth);

settingRouter.get("/", getUserSetting).patch("/:id", updateUserSetting);

module.exports = settingRouter;
