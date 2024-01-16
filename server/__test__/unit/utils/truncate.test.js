const truncate = require("../../truncate");

describe("testing truncate...", () => {
  test("truncate should be defined", () => {
    expect(truncate).toBeDefined();
  });

  test("truncate should be a function", () => {
    expect(typeof truncate).toBe("function");
  });
});
