const User = require('../models/User');
const {
  passwordCompare,
  hashPassword,
  compareHashed,
} = require('./authServices');

const login = async (username, password) => {
  const user = await User.findOne({ username });
  const userExist = Boolean(user);
  if (userExist) {
    const isMatch = await compareHashed(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error('User and/or password do not match');
    }
  } else {
    throw new Error('User and/or password do not match');
  }
};

const register = async (fullName, username, password, repeatPassword) => {
  const isEqual = passwordCompare(password, repeatPassword);
  if (isEqual) {
    const hash = await hashPassword(password);
    return await User.create({ name: fullName, username, password: hash });
  }
  throw new Error('Passwords should match');
};
const userServices = { login, register };
module.exports = userServices;
