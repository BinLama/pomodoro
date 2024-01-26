const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const Session = models.session;

/**
 * We use session to keep track of pomodoro
 * session that we have completed
 *
 * so, if you finish one pomodoro then you will have
 * 1 completed session with create and update date.
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
