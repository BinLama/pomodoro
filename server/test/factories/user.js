const { faker } = require("@faker-js/faker");
const { User } = require("../../models/index.js");

// faker is used for generating fake data
/**
 * Generate an object which contains attributes needed
 * to successfully create a user instance.
 * @param {Object} props Properties to use for the user.
 * @return {Object}      An object to build the user from.
 */

const data = async (props = {}) => {
  const fName = faker.person.firstName();
  const lName = faker.person.lastName();
  const defaultProps = {
    fName,
    lName,
    email: faker.internet.email(),
    username: faker.internet.userName({ firstName: fName, lastName: lName }),
    hashPw: faker.internet.password(),
  };

  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param {Object} props Properties to use for the user.
 * @return {Object}      A user instance.
 */

const createUser = async (props = {}) => {
  const userData = await data(props);
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = createUser;
