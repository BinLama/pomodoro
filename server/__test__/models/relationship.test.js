const models = require("../../models");
const User = models.user;
const Task = models.task;
const Setting = models.setting;
const truncate = require("../truncate");

describe("checking the association between different tables", () => {
  beforeEach(async () => {
    try {
      await truncate();
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  test("create a new user with only user info", async () => {
    try {
      await models.sequelize.sync({ force: true, logging: false });
      const user = await User.create(
        {
          fName: "harry",
          lName: "potter",
          email: "youAreAWizardHARRY@hogwarts.edu",
          username: "harryDPotter",
          password: "harryIsTheB3stWiz4rD",
        },
        { logging: false }
      );
      expect(user.dataValues.fName).toBe("harry");
      expect(user.dataValues.email).toBe("youAreAWizardHARRY@hogwarts.edu");
    } catch (error) {
      console.log(error);
    }
  }, 30000);
});
