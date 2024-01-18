const jwt = require("jsonwebtoken");
const { COOKIE_NAME, STATUS } = require("../utils/constants");
const models = require("../models");
const { createToken } = require("../utils/tokenManager");
const { StatusCodes } = require("http-status-codes");
const User = models.user;
const Setting = models.setting;
const Color = models.color;

const checkUserToken = (req, res) => {
  const token = req.signedCookies[COOKIE_NAME];
  console.log(req.signedCookies, token);
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          domain: "localhost",
          signed: true,
          path: "/",
        });
        console.log(err);
        console.log("Please provide a correct session token");
        res.redirect("/api/v1/login");
      } else {
        const { id: userId } = decodedToken;

        const user = await User.findOne({
          where: {
            id: userId,
          },
          attributes: ["id", "email", "username"], // Specify the fields you want to retrieve
        });

        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          domain: "localhost",
          signed: true,
          path: "/",
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

        const { username } = user.dataValues;

        return res
          .status(200)
          .json({ status: "success", message: "check success...", username });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

/**
 * register users and create jwt token
 * users and email must be unique in the database
 *
 * @param {object} req
 * @param {object} res
 * @return {object}
 */

const register = async (req, res) => {
  try {
    // remove cookie either way
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
      sameSite: "Lax",
    });

    const user = await createUser(req.body);

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

    return res
      .status(StatusCodes.OK)
      .json({ status: STATUS.SUCCESS, username: user.username });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
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

module.exports = { checkUserToken, register };
