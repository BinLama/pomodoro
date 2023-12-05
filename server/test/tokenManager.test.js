require("dotenv").config();

const { validateToken, createToken } = require("../utils/tokenManager");
const jwt = require("jsonwebtoken");

// Mock process.env.JWT_SECRET
process.env.JWT_SECRET = "secret";

describe("JWT functions", () => {
  // Test createToken function
  test("Token should not be created without id", () => {
    //Arrange
    const email = "test@example.com";
    const expiresIn = "7d";

    // Assert
    expect(() => createToken(undefined, email, expiresIn)).toThrow(Error);
  });

  test("Token should not be created without email", () => {
    //Arrange
    const id = "12345";
    const expiresIn = "7d";

    // Assert
    expect(() => createToken(id, undefined, expiresIn)).toThrow(Error);
  });

  test("Token should not be created without both", () => {
    //Arrange
    const expiresIn = "7d";

    // Assert
    expect(() => createToken(undefined, undefined, expiresIn)).toThrow(Error);
  });

  test("createToken should create a valid JWT token", () => {
    // Arrange
    const id = "12345";
    const email = "test@example.com";
    const expiresIn = "7d";

    // Act
    const token = createToken(id, email, expiresIn);

    // Assert
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    expect(decodedToken.id).toBe(id);
    expect(decodedToken.email).toBe(email);
  });

  // Test validateToken function
  test("validateToken should return decoded token for a valid token", () => {
    // Arrange
    const id = "12345";
    const email = "test@example.com";
    const expiresIn = "7d";
    const token = createToken(id, email, expiresIn);

    // Act
    const decodedToken = validateToken(token);

    // Assert
    expect(decodedToken.id).toBe(id);
    expect(decodedToken.email).toBe(email);
  });

  test("validateToken should handle expired tokens", () => {
    // Arrange
    const id = "12345";
    const email = "test@example.com";
    const expiresIn = "-1s"; // Expired token
    const expiredToken = createToken(id, email, expiresIn);

    // Act
    const validateExpiredToken = () => validateToken(expiredToken);

    // Assert
    expect(validateExpiredToken).toThrow("TokenExpiredError");
  });

  test("validateToken should handle malformed tokens", () => {
    // Arrange
    const invalidToken = "invalid-token";

    // Act
    const validateInvalidToken = () => validateToken(invalidToken);

    // Assert
    expect(validateInvalidToken).toThrow("JsonWebTokenError");
  });

  test("validateToken should handle changed tokens", () => {
    // Arrange
    const id = "12345";
    const email = "test@example.com";
    const expiresIn = "7d";
    const token = createToken(id, email, expiresIn);

    // change all a to b
    const changeTokenValues = token.replace("a", "b");

    // Act
    const validateInvalidToken = () => validateToken(changeTokenValues);

    // Assert
    expect(validateInvalidToken).toThrow("JsonWebTokenError");
  });
});
