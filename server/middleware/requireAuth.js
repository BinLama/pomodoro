const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { COOKIE_NAME } = require("../utils/constants");
const { validateToken } = require("../utils/tokenManager");

// check if the user is authenticated.
const requireAuth = async (req, res, next) => {
  const token = req.signedCookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const decodedToken = validateToken(token);
    const { id: userId } = decodedToken;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id"], // Specify the fields you want to retrieve
    });

    req.user = user.dataValues;

    next();
  } catch (error) {
    console.log(error);
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    res.redirect("/api/v1/login");
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
