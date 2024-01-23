const express = require("express");
const { getColorSetting, updateColorSetting } = require("../controller/Color");

const colorRouter = express.Router();

colorRouter.get("/", getColorSetting).patch("/:id", updateColorSetting);

module.exports = colorRouter;
