const express = require("express");

// controller
const {
  getColorSetting,
  updateColorSetting,
} = require("../controller/color.controller");

// validation
const {
  validateColorIdParam,
  validateColorUpdate,
} = require("../middleware/validation.middleware");

const colorRouter = express.Router();

colorRouter
  .get("/", getColorSetting)
  .patch("/:id", validateColorIdParam, validateColorUpdate, updateColorSetting);

module.exports = colorRouter;
