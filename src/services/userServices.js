const User = require('../models/User');
const register = async (fullName, username, password, repeatPassword) => {
  return await User.create({ name: fullName, username, password });
};
const userServices = { register };
module.exports = userServices;
