const bcrypt = require("bcrypt");
const saltRounds = 12;

const hashIt = (password) => {
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

module.exports = { hashIt };
