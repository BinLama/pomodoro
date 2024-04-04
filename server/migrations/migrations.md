## creating migrations:

```sh
npm run migration:create -- --name name_of_the_migration
```

## create a new user with all the data

```js
const models = require("./models");

console.log(models);
console.log(`USER: ${models.user}`);
// console.log(`Session: ${models.Session}`);
console.log(`Task: ${models.task}`);
console.log(`Setting: ${models.setting}`);
// console.log(`Color: ${models.Color}`);
// console.log(models.User.associate(models));

const User = models.user;
const Task = models.task;
const Setting = models.setting;
// const Color = models.Color;
// const Session = models.Session;

const deleteAll = async () => {
  try {
    await models.sequelize.authenticate();
    await User.destroy({ where: {}, force: true });
    console.log("DESTORYED ALL DATA");
  } catch (error) {
    console.log(error);
  }
};

deleteAll();

(async function test() {
  try {
    await models.sequelize.sync({});
    const user = await User.create(
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
        setting: {},
        // color: {},
        // sessions: [{ completed: 1 }],
      },
      {
        include: [Task, Setting],
      }
    );

    console.log(user.dataValues);
    const setting = await Setting.findOne({
      where: { userId: user.dataValues.id },
    });
    console.log(setting.dataValues);

    const task = await Task.findAll({ where: {} });
    console.log(task);
  } catch (error) {
    console.log(error);
  } finally {
    await models.sequelize.close();
  }
})();
```
