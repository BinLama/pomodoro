const bcrypt = require("bcrypt");
const saltRounds = 12;

/**
 * hash the password
 * @param {string} password - provided a password string
 * @returns {string} hashed password with 12 rounds of salt (mixing)
 */
const hashIt = (password) => {
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

module.exports = { hashIt };
