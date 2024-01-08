const { escapeRegExp } = require("../../../utils/removeKey.js");

describe("check if the regular expression escape works", () => {
  test("escapeRegexExp should handle empty string", () => {
    const myString = "";

    expect(escapeRegExp(myString)).toBe("");
  });

  test("escapeRegexExp should handle no special string", () => {
    const myString = "dance";

    expect(escapeRegExp(myString)).toBe("dance");
  });

  test("escapeRegexExp should handle special string", () => {
    const myString = "dance*";

    expect(escapeRegExp(myString)).toBe("dance\\*");
  });

  test("escapeRegexExp should handle multiple special string", () => {
    const myString = "dance*${[";

    expect(escapeRegExp(myString)).toBe("dance\\*\\$\\{\\[");
  });
});
