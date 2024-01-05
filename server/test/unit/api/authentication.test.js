const request = require("supertest");
const { app } = require("../../../app.js");

describe("POST /api/v1/signup", () => {
  describe("given firstname, lastname, username, email, password", () => {
    // should save the user info
    // respond with json object containing userid
    // should specify json in the content type header.

    test("should respond with 201 status code", async () => {
      const userData = {
        fName: "Harry",
        lName: "Potter",
        email: "youAreAWizardHARRY@hogwarts.edu",
        password: "hassyIsTheB3stWiz4rD",
        username: "harryDPotter",
      };

      const response = await request(app).post("/api/v1/signup").send(userData);
      console.log(response);
      // should respond wiht 200 status code
      expect(response.statusCode).toBe(200);
    });
  });

  // describe("when firstname, lastname, username, email, or password is missing", () => {
  //   // should save the user info
  //   // respond with json object containing userid
  //   // should respond wiht 200 status code
  //   // should specify json in the content type header.
  // });
});
