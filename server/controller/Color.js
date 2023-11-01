const { Color } = require("../models");

const getColorSetting = async (req, res) => {
  try {
    const { id: UserId } = req.user;
    const color = await Color.findOne({
      where: {
        UserId,
      },
    });

    if (!color) {
      return res.status(404).json({ error: `No color for id ${id}` });
    }

    res.status(200).json({ color });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateColorSetting = async (req, res) => {
  try {
    const { id: UserId } = req.user;
    const { id } = req.params;
    const color = await Color.findOne({
      where: {
        UserId,
        id,
      },
    });

    if (!color) {
      return res.status(404).json({ erro: `No Color setting with id: ${id}` });
    }

    const newColor = await color.update(req.body);

    res.status(200).json({ color: newColor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getColorSetting, updateColorSetting };
