const supertest = require("supertest");
const { app } = require("../../../app.js");

describe("POST /api/v1/signup", () => {
  describe("given firstname, lastname, username, email, password", () => {
    // should save the user info
    // respond with json object containing userid
    // should respond wiht 200 status code
    // should specify json in the content type header.
  });

  describe("when firstname, lastname, username, email, or password is missing", () => {
    // should save the user info
    // respond with json object containing userid
    // should respond wiht 200 status code
    // should specify json in the content type header.
  });
});
