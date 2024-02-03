const models = require("../models");

/**
 * Delete all the data that is on the database
 */
module.exports = async () => {
  return await Promise.all(
    Object.keys(models).map((key) => {
      if (["sequelize", "Sequelize"].includes(key)) return;
      return models[key].destroy({ where: {}, force: true, logging: false });
    })
  );
};
