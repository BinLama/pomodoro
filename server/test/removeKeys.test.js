const { removeKeyEndsWith } = require("../utils/removeKey");

test("removeKeyEndsWith should handle an empty object", () => {
  // Arrange
  const myObject = {};

  // Act
  removeKeyEndsWith(myObject, "e");

  // Assert
  expect(myObject).toEqual({});
});

test("removeKeyEndsWith should remove keys ending with the specified letter", () => {
  // Arrange
  const myObject = {
    apple: 1,
    banana: 2,
    orange: 3,
    grape: 4,
  };

  // Act
  removeKeyEndsWith(myObject, "e");

  // Assert
  expect(myObject).toEqual({
    banana: 2,
  });
});

test("removeKeyEndsWith should handle no matching keys", () => {
  // Arrange
  const myObject = {
    apple: 1,
    banana: 2,
    orange: 3,
    grape: 4,
  };

  // Act
  removeKeyEndsWith(myObject, "x");

  // Assert
  expect(myObject).toEqual({
    apple: 1,
    banana: 2,
    orange: 3,
    grape: 4,
  });
});

test("removeKeyEndsWith should handle empty removed string", () => {
  // Arrange
  const myObject = {
    apple: 1,
    banana: 2,
    orange: 3,
    grape: 4,
  };

  // Act
  removeKeyEndsWith(myObject, "");

  // Assert
  expect(myObject).toEqual({
    apple: 1,
    banana: 2,
    orange: 3,
    grape: 4,
  });
});

test("removeKeyEndsWith should remove keys ending with the specified special characters", () => {
  // Arrange
  const myObject = {
    key1$$: 1,
    key2$$: 2,
    key3$: 3,
    key4$$$: 4,
  };

  // Act
  removeKeyEndsWith(myObject, "$$");

  // Assert
  expect(myObject).toEqual({
    key3$: 3,
  });
});

test("removeKeyEndsWith should remove keys ending *", () => {
  // Arrange
  const myObject = {
    key1$$: 1,
    key2$$: 2,
    "key3*": 3,
    key4$$$: 4,
  };

  // Act
  removeKeyEndsWith(myObject, "*");

  // Assert
  expect(myObject).toEqual({
    key1$$: 1,
    key2$$: 2,
    key4$$$: 4,
  });
});
