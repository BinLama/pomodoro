const { DataTypes, Op } = require("sequelize");
const sequelize = require("../db/db");
const { hashIt } = require("../utils/hash");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hash_pw: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("hash_pw", hashIt(value));
      },
    },
  },
  {
    tableName: "users",
    timestamps: false, //TODO: remove it for production.
  }
);

const signup = async (f_name, l_name, email, password, username) => {
  try {
    // create the user
    const user = await User.create(
      {
        username: username,
        f_name: f_name,
        l_name: l_name,
        email: email,
        hash_pw: password,
        setting: {},
        color: {},
      },
      {
        include: [User.setting, User.color],
      }
    );

    const newUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(([key, val]) => {
        if (key != "hash_pw") {
          return [key, val];
        }
      })
    );

    return newUser;
  } catch (error) {
    throw new Error(`Error during signup: ${error.message}`);
  }
};

const login = async (usernameOrEmail, password) => {
  try {
    // create the user
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      attributes: ["email", "username", "id", "hash_pw"],
    });

    if (!user) {
      await bcrypt.compare(password, "");
      console.log("user not found");
      throw new Error("Please enter correct credentials");
    }

    // compare password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.hash_pw);

    if (!passwordMatch) {
      console.log("incorrect password");
      throw new Error("Please enter correct credentials");
    }

    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = { User, signup, login };
