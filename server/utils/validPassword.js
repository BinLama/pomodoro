const isValidPassword = (password) => {
  // at least 9 characters long
  if (password.length >= 9) {
    return true;
  }
  // contain at least one Special characters
  // contain at least one upper and lowercase letters
  // contain at least one  numbers
  return false;
};

module.exports = { isValidPassword };
