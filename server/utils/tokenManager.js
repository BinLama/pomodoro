const jwt = require("jsonwebtoken");

/**
 * Create a token
 * @param {string} id - uuid V4 id
 * @param {string} email - valid email address
 * @param {string} expiresIn - "7d" string for token to be valid for 7 days.
 * @returns {string} jwt token - token that can be used for authentication.
 */
const createToken = (id, email, expiresIn) => {
  if (!id || !email || !process.env.JWT_SECRET) {
    throw new Error("Id or email not valid");
  }

  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  // throw new Error("Token not created");
  return token;
};

/**
 * Validate the user sent tokens
 * @param {Token} token
 * @param {string}
 * @returns {object} decodedToken.id - user's id used for finding him
 * @source { https://stackoverflow.com/questions/64471965/mocking-jsonwebtoken-module-with-jest }
 */
const validateToken = (token) => {
  const callback = (err, decodedToken) => {
    if (err === null && decodedToken.id) {
      return decodedToken;
    } else if (err.name === "TokenExpiredError") {
      throw new Error("TokenExpiredError");
    } else if (err.name === "JsonWebTokenError") {
      throw new Error("JsonWebTokenError");
    }
  };
  return jwt.verify(token, process.env.JWT_SECRET, callback);
};
module.exports = { validateToken, createToken };
