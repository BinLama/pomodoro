const express = require("express");
const {
  getAllSessions,
  createNewSession,
} = require("../controller/session.controller");

const sessionRouter = express.Router();

sessionRouter.route("/").get(getAllSessions).post(createNewSession);

module.exports = sessionRouter;
