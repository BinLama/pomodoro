/**
 * validate the password before sending to database
 *
 * @param {string} password
 * @return {boolean} false if validation fails else true
 */

const isValidPassword = (password) => {
  // at least 9 characters long
  if (!password) {
    return false;
  }

  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/gm;

  if (!password.match(regex)) {
    console.log("not match");
    return false;
  }
  console.log("match");
  return true;
};

module.exports = { isValidPassword };
