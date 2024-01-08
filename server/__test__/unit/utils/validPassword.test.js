const { isValidPassword } = require("../../../utils/validPassword.js");

test("return false if given an empty string", () => {
  const password = "";
  expect(isValidPassword(password)).toBe(false);
});

test("return true if give a 8 password character or longer , regular and capitalized letter, number and a special character", () => {
  const password = "tesT123#!_s";
  expect(isValidPassword(password)).toBe(true);
});
