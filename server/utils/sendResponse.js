const messageType = {
  user: "user",
  task: "task",
  error: "error",
  setting: "setting",
  session: "session",
};

const createResponse = (res, code, msg, msgType) => {
  return res.status(code).json({ [msgType]: msg });
};

module.exports = { createResponse, messageType };
