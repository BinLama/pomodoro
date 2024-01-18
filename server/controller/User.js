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

// user sequelize requests
const createUser = async ({ fName, lName, email, password, username }) => {
  try {
    // create the user
    const user = await User.create(
      {
        username: username,
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        setting: {},
        color: {},
      },
      {
        include: [User.setting, User.color],
      }
    );

    const newUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(([key, val]) => {
        if (key != "password") {
          return [key, val];
        }
      })
    );

    return newUser;
  } catch (error) {
    throw new Error(`Error during signup: ${error.message}`);
  }
};

const login = async (usernameOrEmail, password) => {
  try {
    // create the user
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      attributes: ["email", "username", "id", "password"],
    });

    if (!user) {
      await bcrypt.compare(password, "");
      console.log("user not found");
      throw new Error("Please enter correct credentials");
    }

    // compare password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashPw);

    if (!passwordMatch) {
      console.log("incorrect password");
      throw new Error("Please enter correct credentials");
    }

    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
};
