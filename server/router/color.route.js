const express = require("express");
const { getColorSetting, updateColorSetting } = require("../controller/Color");
const { validateColorIdParam } = require("../middleware/validation.middleware");

const colorRouter = express.Router();

colorRouter
  .get("/", getColorSetting)
  .patch("/:id", validateColorIdParam, updateColorSetting);

module.exports = colorRouter;
