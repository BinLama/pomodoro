const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Color = models.color;

/**
 * get the color setting data
 * Right now, color choices should be limited to
 * [black, white]
 *
 * @param {object} req
 * @param {object} res
 * @return {object} a object of color setting
 */
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

/**
 * update the color for the user that is logged in
 * both userId and colorId should be provided for unique output
 *
 * @param {object} req
 * @param {object} res
 * @return {object} updated color setting
 */
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
