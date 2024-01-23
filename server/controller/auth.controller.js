const { COOKIE_NAME, STATUS, EXPIRE_TIME } = require("../utils/constants");
const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const { createToken, validateToken } = require("../utils/tokenManager");

// auth
const bcrypt = require("bcrypt");

// models
const models = require("../models");
const { ForbiddenError } = require("../errors/customErrors");
const User = models.user;
const Setting = models.setting;
const Color = models.color;

/**
 * check if the already created token is valid.
 * This is used to persist the user login even after
 * they close the browser and come back in within 7 days.
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} object with all user info
 */
// TODO: test this code by reloading the webpage after login.
const checkUserToken = async (req, res) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    // renew the cookie
    const decodedToken = validateToken(token);

    const { id: userId } = decodedToken;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "email", "username"], // Specify the fields you want to retrieve
    });

    const { username } = user.dataValues;

    return res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "check success...", username });
  } catch (error) {
    console.log(err);
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    res.redirect("/api/v1/login");
  }
};

/**
 * register users and create jwt token
 * users and email must be unique in the database
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} it will be a res object
 * containing user information
 */
const register = async (req, res) => {
  try {
    await createUser(req.body);
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: error.message,
      error: "Internal Server Error",
    });
  }
};

/**
 * login user
 * @param {object} req
 * @param {object} res
 *
 * @return {object} it will be a res object
 * containing user information
 */
const loginUser = async (req, res) => {
  try {
    const user = await login(req.body);

    // create a token
    const token = createToken(user.id, user.email, `${EXPIRE_TIME}d`);

    // create a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + EXPIRE_TIME);

    res.cookie(COOKIE_NAME, token, {
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(StatusCodes.OK)
      .json({ status: STATUS.SUCCESS, msg: "user loged in" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: error.message,
      error: "Internal Server Error",
    });
  }
};

/**
 * @param {object} req
 * @param {object} res
 *
 * @return {object} res with cookies removed.
 */
const logoutUser = (req, res) => {
  try {
    // remove the cookie to logout
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    return res.status(StatusCodes.OK).json({ msg: "user logged out" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: error.message,
      error: "Internal Server Error",
    });
  }
};

/**
 * create a new user
 * @param {string} fName
 * @param {string} lName
 * @param {string} email
 * @param {string} password
 * @param {string} username
 *
 * @return {object} new user with most data
 */
const createUser = async ({ fName, lName, email, password, username }) => {
  const t = await models.sequelize.transaction();
  try {
    // create the user
    const user = await User.create(
      {
        username,
        fName,
        lName,
        email,
        password,
        setting: {},
        color: {},
      },
      {
        include: [Setting, Color],
      },
      { transaction: t }
    );

    await t.commit();

    const nUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(([key, val]) => {
        if (key != "password") {
          return [key, val];
        }
      })
    );

    return nUser;
  } catch (error) {
    throw new Error(`Error during signup: ${error.message}`);
  }
};

/**
 * login user
 * @param {string} usernaemOrEmail
 * @param {string} password
 *
 * @return {object} new user with their data
 */
const login = async ({ usernameOrEmail, password }) => {
  try {
    // create the user
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      attributes: ["email", "username", "id", "password"],
    });

    // find valid user and compare password with the hashed password
    const isValidUser = user && (await bcrypt.compare(password, user.password));

    if (!isValidUser) {
      throw new ForbiddenError("Please enter correct credentials");
    }

    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = { checkUserToken, register, loginUser, logoutUser };
