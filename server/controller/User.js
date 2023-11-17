const { User, signup, login } = require("../models/index");
const { validateEmail } = require("../utils/isEmail");
const { Op } = require("sequelize");
const { createToken } = require("../utils/tokenManager");
const { COOKIE_NAME } = require("../utils/constants");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["hash_pw"] },
    });
    return res.status(200).json({ user: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// signup users
const signupUser = async (req, res) => {
  try {
    let { f_name, l_name, username, email, password } = req.body;

    if (!(f_name && l_name && email && password && username)) {
      return res
        .status(400)
        .json({ error: "Not all information was provided" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: `Please enter a proper email.` });
    }

    if (password.length < 9) {
      return res.status(400).json({ error: "Please add a longer password" });
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
      return res.status(409).json({ error: `User already exists.` });
    }

    const user = await signup(f_name, l_name, email, password, username);

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
      sameSite: "Lax",
    });

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

    res.status(201).json({ status: "success", username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!(usernameOrEmail && password)) {
      return res
        .status(401)
        .json({ error: "Please provide all the information" });
    }

    const user = await login(usernameOrEmail, password);

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

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

    res.status(200).json({ status: "success", username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    console.log(req.signedCookies[COOKIE_NAME]);
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Logged out..." });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Logout failed",
      error: error.message,
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
      return res.status(404).json({ error: `No user with id: ${id}` });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: `No user with id: ${id}` });
    }

    await User.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    res.status(200).json({
      user: `User with id: ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    const { f_name, l_name, username } = req.body;

    if (f_name === "" || l_name === "" || username === "") {
      return res
        .status(400)
        .json({ error: `Please insert proper information` });
    }

    // first find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
    });

    if (!user) {
      return res.status(404).json({ error: `User with id: ${id} not found.` });
    }

    const updatedOldUser = await user.update(req.body);

    console.log(updatedOldUser);
    return res.status(200).json({ user: updatedOldUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
