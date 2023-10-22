const jwt = require("jsonwebtoken");
const { User } = require("../models");

// check if the user is authenticated.
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id: userId } = jwt.verify(token, process.env.SECRET);

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
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
