const { EXPIRE_TIME, COOKIE_NAME } = require("../utils/constants");
const { StatusCodes } = require("http-status-codes");
const { createToken } = require("../utils/tokenManager");

// models
const models = require("../models");
const { InternalError, NotFoundError } = require("../errors/customErrors");
const User = models.user;
const Setting = models.setting;
const Color = models.color;

/**
 * return all the users that have signed up
 * this path should be deleted later
 *
 * @param {object} req
 * @param {object} res
 * @return {object} all the users that is found on the server
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["email", "username", "id", "fName", "lName"],
    });

    if (!users) {
      // return res
      //   .status(StatusCodes.NOT_FOUND)
      //   .json({ error: `No users found` });
      const err = new NotFoundError("No users found");
      return next(err);
    }

    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    const err = new InternalError(`Error getting all user: ${error.message}`);

    next(err);
  }
};

/**
 * find a user that is logged in and provide their
 * information.
 *
 * @param {object} req
 * @param {object} res
 * @return {object} single user
 */
const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        username: user.username,
        id: user.id,
        fName: user.fName,
        lName: user.lName,
      },
    });
  } catch (error) {
    const err = new InternalError(`Error getting user: ${error.message}`);

    next(err);
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
const createUser = async (req, res, next) => {
  const t = await models.sequelize.transaction();
  try {
    const { fName, lName, email, password, username } = req.body;
    // create the user
    const user = await User.create(
      {
        username,
        fName,
        lName,
        email,
        password,
        setting: {}, // default setting
        color: {}, // default color
      },
      {
        include: [Setting, Color],
      },
      { transaction: t }
    );

    await t.commit();

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

    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    const err = new InternalError(
      `Error during user creation: ${error.message}`
    );

    next(err);
  }
};

/**
 * find a user that is logged in and update their
 * information. It should not update email or password.
 *
 * @param {object} req
 * @param {object} res
 * @return {object} updated user information
 */
const updateUser = async (req, res, next) => {
  try {
    const user = req.user;

    const updatedOldUser = await user.update(req.body, {
      attributes: ["email", "username", "id", "fName", "lName"],
    });

    return res.status(StatusCodes.OK).json({ user: updatedOldUser });
  } catch (error) {
    const err = new InternalError(
      `Error during user creation: ${error.message}`
    );

    next(err);
  }
};

/**
 * find a user that is logged in and delete their
 * information.
 *
 * @param {object} req
 * @param {object} res
 * @return {object} deleted user information
 */
const deleteUser = async (req, res) => {
  // have to be very careful with deleting a user.
  // first need to validate of it's the proper user
  // then I will have to give me some days to delete the user.
  // if they log back in, then don't delete the user anymore
  //
  try {
    const user = req.user;

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    res.status(StatusCodes.OK).json({
      msg: `User has been deleted`,
    });
  } catch (error) {
    const err = new InternalError(
      `Error during user creation: ${error.message}`
    );

    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
