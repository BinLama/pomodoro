const { STATUS } = require("../utils/constants");
const { StatusCodes } = require("http-status-codes");

// models
const models = require("../models");
const User = models.user;

/**
 * return all the users that have signed up
 * this path should be deleted later
 *
 * @param {object} req
 * @param {object} res
 * @return {object} all the users that is found on the server
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!users) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: STATUS.ERROR, error: `No users found` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ status: STATUS.SUCCESS, user: users });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
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
const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: STATUS.ERROR, error: `No user with id: ${id}` });
    }

    res.status(StatusCodes.OK).json({ status: STATUS.SUCCESS, user: user });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
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
    const { id } = req.user;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: STATUS.ERROR, error: `No user with id: ${id}` });
    }

    await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(StatusCodes.OK).json({
      status: STATUS.SUCCESS,
      user: `User with id: ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
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
const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    const { password, email } = req.body;

    if (password || email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: STATUS.ERROR,
        error: "Some information provided cannot be changed directly",
      });
    }
    // first find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: STATUS.ERROR,
        error: `User with id: ${id} not found.`,
      });
    }

    const updatedOldUser = await user.update(req.body, {
      exclude: ["password"],
    });

    return res
      .status(StatusCodes.OK)
      .json({ status: STATUS.SUCCESS, user: updatedOldUser });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
