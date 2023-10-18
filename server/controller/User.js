const User = require("../models/User");
const { validateEmail } = require("../utils/isEmail");

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["hash_pw"] },
    });
    return res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
    });

    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${id}` });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { f_name, l_name, username, email, password } = req.body;

    if (!(f_name && l_name && email && password && username)) {
      return res.status(400).json({ msg: "Not all information was provided" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: `Please enter a proper email.` });
    }

    // check if email exits on the server
    const emailInDB = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["email", "username"],
    });

    // check if username exits on the server
    const usernameInDB = await User.findOne({
      where: {
        username: username,
      },
      attributes: ["email", "username"],
    });

    if (emailInDB || usernameInDB) {
      return res.status(409).json({ msg: `User already exists.` });
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

    const newUser = Object.fromEntries(
      Object.entries(user.dataValues).filter(([key, val]) => {
        if (key != "hash_pw") {
          return [key, val];
        }
      })
    );

    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // add settings, color,
  // const user = User.build()
};

const deleteUser = async (req, res) => {
  // have to be very careful with deleting a user.
  // first need to validate of it's the proper user
  // then I will have to give me some days to delete the user.
  // if they log back in, then don't delete the user anymore
  //
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: `User with id: ${id} not found.` });
    }

    res.status(200).json({
      msg: `Deleting User: ${id}`,
      user: deleted,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { f_name, l_name, username } = req.body;

    if (f_name === "" || l_name === "" || username === "") {
      return res.status(400).json({ msg: `Please insert proper information` });
    }

    // first find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hash_pw"] },
    });

    if (!user) {
      return res.status(404).json({ msg: `User with id: ${id} not found.` });
    }

    const updatedOldUser = await user.update(req.body);

    return res.status(200).json({ user: updatedOldUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
