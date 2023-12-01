const { User, signup, login } = require("../models/index");
const { validateEmail } = require("../utils/isEmail");
const { Op } = require("sequelize");
const { createToken } = require("../utils/tokenManager");
const { COOKIE_NAME, STATUS } = require("../utils/constants");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["hash_pw"] },
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

// signup users
const signupUser = async (req, res) => {
  try {
    let { f_name, l_name, username, email, password } = req.body;

    if (!(f_name && l_name && email && password && username)) {
      return res.status(400).json({
        status: STATUS.ERROR,
        error: "Not all information was provided",
      });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ status: STATUS.ERROR, error: `Please enter a proper email.` });
    }

    if (password.length < 9) {
      return res
        .status(400)
        .json({ status: STATUS.ERROR, error: "Please add a longer password" });
    }

    username = username.trim();
    email = email.trim();

    // check if email or username exits on the server
    const usernameOrEmailExists = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
      attributes: ["email", "username"],
    });

    if (usernameOrEmailExists) {
      return res
        .status(409)
        .json({ status: STATUS.ERROR, error: `User already exists.` });
    }

    // remove cookie either way
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
      sameSite: "Lax",
    });

    const user = await signup(f_name, l_name, email, password, username);

    // create a token
    const token = createToken(user.id, user.email, "7d");

    // create a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    res.status(201).json({ status: STATUS.SUCCESS, username: user.username });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!(usernameOrEmail && password)) {
      return res.status(401).json({
        status: STATUS.ERROR,
        error: "Please provide all the information",
      });
    }

    // no matter what, clear the cookies
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    const user = await login(usernameOrEmail, password);

    // create a token
    const token = createToken(user.id, user.email, "7d");

    // create a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    res.status(200).json({ status: STATUS.SUCCESS, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: STATUS.ERROR, error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    console.log(req.signedCookies[COOKIE_NAME]);

    // remove the cookie to logout
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    return res
      .status(200)
      .json({ status: STATUS.SUCCESS, message: "Logged out..." });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: STATUS.ERROR,
      message: "Logout failed",
      error: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
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

    const { f_name, l_name, username } = req.body;

    if (f_name === "" || l_name === "" || username === "") {
      return res.status(400).json({
        status: STATUS.ERROR,
        error: `Please insert proper information`,
      });
    }

    // first find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
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
  signupUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
};
