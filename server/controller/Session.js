const { Session } = require("../models");

const getAllSessions = async (req, res) => {
  try {
    const { id } = req.user;

    const session = await Session.findAll({
      where: {
        UserId: id,
      },
    });

    if (!session) {
      return res.status(404).json({ error: `No session for id ${id}` });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewSession = async (req, res) => {
  try {
    const { id: UserId } = req.user;

    const session = await Session.create({
      UserId,
    });

    if (!session) {
      return res.status(404).json({ error: `No session with id: ${UserId}` });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllSessions, createNewSession };
