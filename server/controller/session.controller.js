const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Session = models.session;

/**
 * session that we have completed
 *
 * @param {object} req
 * @param {object} res
 * @return {object} get all user sessions
 */

const getAllSessions = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const session = await Session.findAll({
      where: {
        userId,
      },
    });

    if (!session) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No session for id ${userId}` });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

/**
 * We use session to keep track of pomodoro
 * session that we have completed
 *
 * @param {object} req
 * @param {object} res
 * @return {object} create new user session
 */

const createNewSession = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const session = await Session.create({
      userId,
    });

    res.status(StatusCodes.CREATED).json({ session });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};

module.exports = { getAllSessions, createNewSession };
