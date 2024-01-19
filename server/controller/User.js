const { validateEmail } = require("../utils/isEmail");
const { Op } = require("sequelize");
const { createToken } = require("../utils/tokenManager");
const { COOKIE_NAME, STATUS } = require("../utils/constants");
const models = require("../models");
const User = models.user;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!users) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, error: `No users found` });
    }

    return res.status(200).json({ status: STATUS.SUCCESS, user: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, error: `No user with id: ${id}` });
    }

    res.status(200).json({ status: STATUS.SUCCESS, user: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

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
        .status(404)
        .json({ status: STATUS.ERROR, error: `No user with id: ${id}` });
    }

    await User.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    res.status(200).json({
      status: STATUS.SUCCESS,
      user: `User with id: ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    const { fName, lName, username } = req.body;

    if (fName === "" || lName === "" || username === "") {
      return res.status(400).json({
        status: STATUS.ERROR,
        error: `Please insert proper information`,
      });
    }

    // first find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hashPw"] },
    });

    if (!user) {
      return res.status(404).json({
        status: STATUS.ERROR,
        error: `User with id: ${id} not found.`,
      });
    }

    const updatedOldUser = await user.update(req.body);

    console.log(updatedOldUser);
    return res
      .status(200)
      .json({ status: STATUS.SUCCESS, user: updatedOldUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
