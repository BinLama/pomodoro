const models = require("../../models");
const User = models.user;
const Task = models.task;
const Setting = models.setting;
const truncate = require("../truncate");

describe("checking the association between different tables", () => {
  beforeEach(async () => {
    try {
      await truncate();
      await models.sequelize.sync({ logging: false });
    } catch (error) {
      console.log(`Truncate: ${error}`);
    }
  }, 30000);

  afterAll(async () => {
    await truncate();
    await models.sequelize.close();
  });

  test("create a new user with only user info", async () => {
    try {
      // await models.sequelize.sync({ logging: false });
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

  test("create a new user with setting info", async () => {
    try {
      await User.create(
        {
          fName: "harry",
          lName: "potter",
          email: "youAreAWizardHARRY@hogwarts.edu",
          username: "harryDPotter",
          password: "harryIsTheB3stWiz4rD",
          setting: {},
        },
        { logging: false, include: [Setting] }
      );

      const count = await Setting.count({ logging: false });

      expect(count).toBe(1);
      expect(count).not.toBe(2);
    } catch (error) {
      console.log(error);
    }
  }, 30000);

  test("create a new user with tasks", async () => {
    try {
      await User.create(
        {
          fName: "harry",
          lName: "potter",
          email: "youAreAWizardHARRY@hogwarts.edu",
          username: "harryDPotter",
          password: "harryIsTheB3stWiz4rD",
          tasks: [
            { title: "Wash Face" },
            { title: "Focus on finishing the work" },
            { title: "Get a job" },
          ],
        },
        { logging: false, include: [Task] }
      );

      const count = await Task.count({ logging: false });

      expect(count).toBe(3);
      expect(count).not.toBe(1);
    } catch (error) {
      console.log(error);
    }
  }, 30000);
});
