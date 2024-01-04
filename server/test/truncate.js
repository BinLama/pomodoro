const { User } = require("../models/index.js");

/**
 * Delete all the data that is on the database
 */
const truncateData = async () => {
  await User.destroy({
    where: {},
    force: true,
  });
};

module.exports = truncateData;
