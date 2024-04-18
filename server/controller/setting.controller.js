const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Setting = models.setting;

/**
 * get the setting for the user that is logged in.
 *
 * @param {object} req
 * @param {object} res
 * @return {object} updated user setting
 */
const getUserSetting = async (req, res) => {
  try {
    const { id: userId } = req.auth;

    const setting = await Setting.findOne({
      where: {
        userId,
      },
    });

    if (!setting) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No settings found` });
    }

    res.status(StatusCodes.OK).json({ setting });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

/**
 * update the setting for the user that is logged in.
 * Updated values can be setting values..
 *
 * @param {object} req
 * @param {object} res
 * @return {object} updated user setting
 */
const updateUserSetting = async (req, res) => {
  try {
    const setting = req.setting;

    await setting.update(req.body);

    res.status(StatusCodes.OK).json({ msg: "setting updated" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

module.exports = { updateUserSetting, getUserSetting };
