const createUser = require("../../factories/user");
const truncateData = require("../../truncate.js");

describe("User model", () => {
  let user;

  beforeEach(async () => {
    await truncateData();

    user = await createUser();
  }, 10000);

  test("user is created", async () => {
    expect(user.id).toBeTruthy();
  });
});
