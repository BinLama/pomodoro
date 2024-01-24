const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Color = models.color;

const getColorSetting = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const color = await Color.findOne({
      where: {
        userId,
      },
    });

    if (!color) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No color for id ${userId}` });
    }

    res.status(StatusCodes.OK).json({ color });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

const updateColorSetting = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: colorId } = req.params;

    await Color.update(req.body, {
      where: {
        userId,
        id: colorId,
      },
    });

    res.status(StatusCodes.OK).json({ msg: "color updated" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

module.exports = { getColorSetting, updateColorSetting };
