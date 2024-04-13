"use strict";
const { validateToken, createToken } = require("../utils/tokenManager");
const { COOKIE_NAME, EXPIRE_TIME } = require("../utils/constants");

const { UnauthorizedError, NotFoundError } = require("../errors/customErrors");

// models
const models = require("../models");
const User = models.user;

/**
 * check if the user is signed in.
 * @param {object} req
 * @param {object} res
 * @param {function} next it will go to next handler (most likely a controller)
 *
 */
const requireSignIn = async (req, res, next) => {
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

    // create a token
    const nToken = createToken(user.id, user.email, `${EXPIRE_TIME}d`);

    // create a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + EXPIRE_TIME);

    req.auth = user;

    res.cookie(COOKIE_NAME, nToken, {
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

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

/**
 * check if the user has authroization to make any changes.
 * @param {object} req
 * @param {object} res
 * @param {function} next it will go to next handler (most likely a controller)
 *
 */
const hasAuthorization = (req, res, next) => {
  const authorized = req.user && req.auth && req.user.id === req.auth.id;
  if (!authorized) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
    });

    const err = new UnauthorizedError("Request is not authorized");
    return next(err);
  }
  next();
};

module.exports = { requireSignIn, hasAuthorization };
