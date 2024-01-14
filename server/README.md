#### TODO:

- [x] fix the mysql workbench. Create connections and populate the data.
- [x] run previous seeders.
- [ ] might need to use a dependecy injection and mock the database. I don't want to add real data to the database so mocking sounds like a better idea. Currently, it fails the authentication api test because signup tries to create a user but the server is not open so, tomorrow I need to fix that by using dependecy injection.
- [ ] [testing api](https://www.youtube.com/watch?v=r5L1XRZaCR0)
- [ ] [dependency injection](https://www.youtube.com/watch?v=IDjF6-s1hGk&list=PL0X6fGhFFNTd5_wsAMasuLarx_VSkqYYX&index=5)
- [ ] create test for all the routers, models, and functions
- [ ] automate the tests and create a ci/cd pipeline.
- [ ] implement Oauth

## Start:

Type `npm run dev` to run the client server. It will open the file in localhost:5000.

## creating migrations:

```sh
npm run migration:create -- --name name_of_the_migration

```

## create a new user with all the data,

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
