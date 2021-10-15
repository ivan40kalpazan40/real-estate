const User = require('../models/User');
const { passwordCompare, hashPassword } = require('./authServices');

const register = async (fullName, username, password, repeatPassword) => {
  const isEqual = passwordCompare(password, repeatPassword);
  if (isEqual) {
    const hash = await hashPassword(password);
    return await User.create({ name: fullName, username, password: hash });
  }
  throw new Error('Passwords should match');
};
const userServices = { register };
module.exports = userServices;
