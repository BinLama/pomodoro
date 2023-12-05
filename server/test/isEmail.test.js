const { validateEmail } = require("../utils/isEmail");
// emailValidation.test.js

describe("checking for valid email", () => {
  test("validateEmail should return true for a valid email address", () => {
    // Arrange
    const validEmail = "test@example.com";

    // Act
    const isValid = validateEmail(validEmail);

    // Assert
    expect(isValid).toBe(true);
  });

  test("validateEmail should return false for an invalid email address", () => {
    // Arrange
    const invalidEmail = "invalid.email@";

    // Act
    const isValid = validateEmail(invalidEmail);

    // Assert
    expect(isValid).toBe(false);
  });

  test("validateEmail should return false for an empty string", () => {
    // Arrange
    const emptyEmail = "";

    // Act
    const isValid = validateEmail(emptyEmail);

    // Assert
    expect(isValid).toBe(false);
  });

  test("validateEmail should return false for null", () => {
    // Arrange
    const nullEmail = null;

    // Act
    const isValid = validateEmail(nullEmail);

    // Assert
    expect(isValid).toBe(false);
  });

  test("validateEmail should return false for undefined", () => {
    // Arrange
    const undefinedEmail = undefined;

    // Act
    const isValid = validateEmail(undefinedEmail);

    // Assert
    expect(isValid).toBe(false);
  });

  test("validateEmail should return true for a valid multiple sub domain email address", () => {
    // Arrange
    const validEmail = "test@example.data.heaven.com";

    // Act
    const isValid = validateEmail(validEmail);

    // Assert
    expect(isValid).toBe(true);
  });

  test("validateEmail should return false for a invalid multiple sub domain email address", () => {
    // Arrange
    const validEmail = "test@example...com";

    // Act
    const isValid = validateEmail(validEmail);

    // Assert
    expect(isValid).toBe(false);
  });
});
