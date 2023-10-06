const getUserSetting = (req, res) => {
  console.log(req.params);
  res.send(`user ${req.params.id}'s setting`);
};

const setUserSetting = (req, res) => {
  res.send(`user ${req.params.id}'s setting is set up`);
};

module.exports = { getUserSetting, setUserSetting };
