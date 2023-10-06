// data
const info = require("../data.json");

// db models
const User = require("./User");
const Setting = require("./Setting");
const Color = require("./Color");
const Task = require("./Task");
const Session = require("./Session");

const makeConnection = () => {
  // One to One User and Setting
  User.setting = User.hasOne(Setting, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  Setting.belongsTo(User, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  // One to One User and Color
  User.color = User.hasOne(Color, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  Color.belongsTo(User, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  // One to Many User and Task (many task)
  User.tasks = User.hasMany(Task, {
    onDelete: "CASCADE",
  });
  Task.belongsTo(User, {
    onDelete: "CASCADE",
  });

  // One to many User and Session (many Session)
  User.sessions = User.hasMany(Session, {
    onDelete: "CASCADE",
  });
  Session.belongsTo(User, {
    onDelete: "CASCADE",
  });
};

const start = async () => {
  makeConnection();
  // await sequelize.sync({});
  // create user in sign up
  // await User.bulkCreate(info, {
  //   include: [User.setting, User.color, User.tasks, User.sessions],
  // });

  // DELETE QUERY
  // User.destroy({
  //   where: {
  //     f_name: "first",
  //   },
  // });

  // CREATE QUERY
  // const user = User.create(
  //   {
  //     username: "please",
  //     f_name: "first",
  //     l_name: "last",
  //     email: "firstlast@place.place",
  //     hash_pw: "123456",
  //     setting: {},
  //     color: {},
  //     sessions: [{ completed: 1 }],
  //     tasks: [
  //       { task: "Wash Face" },
  //       { task: "Focus on finishing the work" },
  //       { task: "Get a job" },
  //     ],
  //   },
  //   {
  //     include: [User.setting, User.color, User.tasks, User.sessions],
  //   }
  // );
  // console.log(user);

  // const oneUser = await User.findOne({
  //   where: { email: "garpBeatTheShitOutOfMe@foosha.village" },
  // });
  // console.log(oneUser);
  // const oneSetting = await Setting.findOne({ where: { UserId: null } });
  // console.log(oneSetting);
  // oneUser.setSetting(oneSetting);
  console.log("Create Model Connection");
};

module.exports = start;
