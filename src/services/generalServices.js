const User = require('../models/User');

exports.userExists = function (username) {
  const user = User.findOne({ username });
  return user;
};
