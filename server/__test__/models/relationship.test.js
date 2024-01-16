const models = require("../../models");
const User = models.user;
const Task = models.task;
const Setting = models.setting;
const Color = models.color;
const Session = models.session;

const truncate = require("../truncate");

describe("checking the association between User and other tables", () => {
  beforeEach(async () => {
    await truncate();
    await models.sequelize.sync({ logging: false });
  }, 30000);

  afterAll(async () => {
    await truncate();
    await models.sequelize.close();
  });

  test("create a new user with only user info", async () => {
    // await models.sequelize.sync({ logging: false });
    expect.assertions(2);
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
    // } catch (error) {
    // console.log(error);
    // }
  }, 30000);

  test("create a new user with setting info", async () => {
    expect.assertions(2);
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
  }, 30000);

  test("create a new user with tasks", async () => {
    expect.assertions(2);
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
  }, 30000);

  test("create a new user with tasks and setting", async () => {
    expect.assertions(2);
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
        ],
        setting: {},
      },
      { logging: false, include: [Task, Setting] }
    );

    const taskCount = await Task.count({ logging: false });
    const settingCount = await Setting.count({ logging: false });

    expect(taskCount).toBe(2);
    expect(settingCount).toBe(1);
  }, 30000);

  test("create a new user with color and user", async () => {
    await User.create(
      {
        fName: "harry",
        lName: "potter",
        email: "youAreAWizardHARRY@hogwarts.edu",
        username: "harryDPotter",
        password: "harryIsTheB3stWiz4rD",
        color: {},
      },
      { logging: false, include: [Color] }
    );

    const colorCount = await Color.count({ logging: false });

    expect(colorCount).toBe(1);
  }, 30000);

  test("create a new user with session and user", async () => {
    expect.assertions(2);
    await User.create(
      {
        fName: "harry",
        lName: "potter",
        email: "youAreAWizardHARRY@hogwarts.edu",
        username: "harryDPotter",
        password: "harryIsTheB3stWiz4rD",
        sessions: [{ completed: true }, { completed: true }],
      },
      { logging: false, include: [Session] }
    );

    const userCount = await User.count({ logging: false });
    const sessionCount = await Session.count({ logging: false });

    expect(userCount).toBe(1);
    expect(sessionCount).toBe(2);
  }, 30000);

  test("create user with add default tables added", async () => {
    expect.assertions(5);
    await User.create(
      {
        fName: "harry",
        lName: "potter",
        email: "youAreAWizardHARRY@hogwarts.edu",
        username: "harryDPotter",
        password: "harryIsTheB3stWiz4rD",
        sessions: [{ completed: true }, { completed: true }],
        setting: {},
        tasks: [
          { title: "make a fireball" },
          { title: "be the greatest mage ever!" },
        ],
        color: {},
      },
      { logging: false, include: [Session, Setting, Task, Color] }
    );
    const userCount = await User.count({ logging: false });
    const sessionCount = await Session.count({ logging: false });
    const settingCount = await Setting.count({ logging: false });
    const taskCount = await Task.count({ logging: false });
    const colorCount = await Color.count({ logging: false });

    expect(userCount).toBe(1);
    expect(sessionCount).toBe(2);
    expect(settingCount).toBe(1);
    expect(taskCount).toBe(2);
    expect(colorCount).toBe(1);
  }, 30000);
});
