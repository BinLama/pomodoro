const { Setting } = require("../models");

const getUserSetting = async (req, res) => {
  try {
    const { id: UserId } = req.user;

    const setting = await Setting.findOne({
      where: {
        UserId,
      },
    });

    if (!setting) {
      return res.status(404).json({ error: `No settings found` });
    }

    res.status(200).json({ setting });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.user;

    const setting = await Setting.findOne({
      where: {
        id,
        UserId,
      },
    });

    if (!setting) {
      return res.status(404).json({ error: `No setting with id: ${id}` });
    }

    const updatedSetting = await setting.update(req.body);

    res.status(200).json({ setting: updatedSetting });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateUserSetting, getUserSetting };
