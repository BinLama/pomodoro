const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { getAllSessions, createNewSession } = require("../controller/Session");

const sessionRouter = express.Router();

sessionRouter.use(requireAuth);

sessionRouter.route("/").get(getAllSessions).post(createNewSession);

module.exports = sessionRouter;
