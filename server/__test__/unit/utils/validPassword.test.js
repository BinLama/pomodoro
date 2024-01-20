const { isValidPassword } = require("../../../utils/validPassword.js");

describe("testing password validator", () => {
  test("return false if given an empty string", () => {
    const password = "";
    expect(isValidPassword(password)).toBe(false);
  });

  test("return false if give a 8 password character or longer , regular and capitalized letter, number and a special character", () => {
    const password = "tT1#!_sW";
    expect(isValidPassword(password)).toBe(true);
  });

  test("given 8 characters, it should return false", () => {
    const password = "testings";
    expect(isValidPassword(password)).toBe(false);
  });

  test("given 8 characters and 1 number, it should return false", () => {
    const password = "testings1";
    expect(isValidPassword(password)).toBe(false);
  });

  test("given 8 number, it should return false", () => {
    const password = "12345678";
    expect(isValidPassword(password)).toBe(false);
  });

  test("given 8 unique characters, it should return false", () => {
    const password = "!@#$%^&*";
    expect(isValidPassword(password)).toBe(false);
  });

  test("given alphanumerical characaters and no speical char, it should return false", () => {
    const password = "asdf123A313";
    expect(isValidPassword(password)).toBe(false);
  });

  test("given an alphanumerical characters and special char, it should return true", () => {
    const password = "passworD!@133";
    expect(isValidPassword(password)).toBe(true);
  });
});
