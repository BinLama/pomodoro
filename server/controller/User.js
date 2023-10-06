const User = require("../models/User");
const { validateEmail } = require("../utils/isEmail");

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["hash_pw"] },
    });
    if (!users) throw new Error(`User with id: ${id} not found.`);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server nto reached");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
    });
    if (!user) throw new Error(`User with id: ${id} not found.`);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  const { f_name, l_name, username, email, password } = req.body;

  if (!(f_name && l_name && email && password && username)) {
    res.stauts(400).json("Not all information was provided");
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json(`Please enter a proper email.`);
    return;
  }

  // check if email exits on the server
  const emailInDB = await User.findOne({
    where: {
      email: email,
    },
    attributes: ["email", "username"],
  });

  console.log(emailInDB);
  if (emailInDB) {
    res.status(409).json(`User with ${email} already exists.`);
    return;
  }

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

  res.status(200).json({ user });
  // add settings, color,
  // const user = User.build()
};

const updateUser = async (req, res) => {
  console.log();
  // try {
  //   const { id } = req.params;
  //   const user = await User.update(id, {
  //     attributes: ["f_name", "l_name", "id", "email", "username"],
  //   });
  //   if (!user) throw new Error(`User with id: ${id} not found.`);
  //   res.json(user);
  // } catch (error) {
  //   console.log(error);
  // }
  res.send(`Editing User: ${req.params.id}`);
};

const deleteUser = (req, res) => {
  res.send(`Deleting User: ${req.params.id}`);
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
