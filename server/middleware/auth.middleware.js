"use strict";
const { validateToken } = require("../utils/tokenManager");
const { COOKIE_NAME } = require("../utils/constants");

const { UnauthorizedError } = require("../errors/customErrors");
const { StatusCodes } = require("http-status-codes");

// models
const models = require("../models");
const User = models.user;

/**
 * check if the user is authenticated middleware.
 * @param {object} req
 * @param {object} res
 * @param {function} next it will go to next handler (most likely a controller)
 *
 */
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.auth_token;

  try {
    if (!token) {
      throw new UnauthorizedError("Authorization token required");
    }
    const decodedToken = validateToken(token);
    const { id } = decodedToken;

    // add user id to the req value
    req.user = { id };
    next();
  } catch (error) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
    });

    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Request is not authorized" });
  }
};

module.exports = authenticateUser;
