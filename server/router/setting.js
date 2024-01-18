const express = require("express");
const { getUserSetting, updateUserSetting } = require("../controller/Setting");

const requireAuth = require("../middleware/auth.middleware");

const settingRouter = express.Router();

// require auth for all task route
settingRouter.use(requireAuth);

settingRouter.get("/", getUserSetting).patch("/:id", updateUserSetting);

module.exports = settingRouter;
