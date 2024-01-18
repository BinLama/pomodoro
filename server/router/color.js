const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getColorSetting, updateColorSetting } = require("../controller/Color");

const colorRouter = express.Router();

colorRouter.use(requireAuth);

colorRouter.get("/", getColorSetting).patch("/:id", updateColorSetting);

module.exports = colorRouter;
