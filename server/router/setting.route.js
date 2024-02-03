const express = require("express");

// controllers
const {
  getUserSetting,
  updateUserSetting,
} = require("../controller/setting.controller");

// validation
const {
  validateSettingIdParam,
  validateSettingUpdate,
} = require("../middleware/validation.middleware");

const settingRouter = express.Router();

settingRouter
  .get("/", getUserSetting)
  .patch(
    "/:id",
    validateSettingIdParam,
    validateSettingUpdate,
    updateUserSetting
  );

module.exports = settingRouter;
