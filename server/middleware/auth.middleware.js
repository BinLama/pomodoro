"use strict";
const { validateToken } = require("../utils/tokenManager");
const { COOKIE_NAME } = require("../utils/constants");

const { UnauthorizedError, NotFoundError } = require("../errors/customErrors");

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
const validateTokenAndGetUser = async (req, res, next) => {
  const token = req.signedCookies[COOKIE_NAME];

  try {
    if (!token) {
      throw new UnauthorizedError("Authorization token required");
    }

    const decodedToken = validateToken(token);
    const { id } = decodedToken;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      const err = new NotFoundError(`No user with id: ${id}`);
      return next(err);
    }

    req.user = user;

    next();
  } catch (error) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
    });

    const err = new UnauthorizedError("Request is not authorized");
    next(err);
  }
};

module.exports = { validateTokenAndGetUser };
