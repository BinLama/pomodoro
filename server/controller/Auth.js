const jwt = require("jsonwebtoken");
const { COOKIE_NAME } = require("../utils/constants");
const { User } = require("../models");
const { createToken } = require("../utils/tokenManager");

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

module.exports = checkUserToken;
