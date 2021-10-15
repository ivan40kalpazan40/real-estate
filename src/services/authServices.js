const bcrypt = require('bcrypt');

exports.passwordCompare = function (pass1, pass2) {
  return pass1 === pass2;
};

exports.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

exports.compareHashed = function (inputPassword, dbPassword) {
  return bcrypt.compare(inputPassword, dbPassword);
};
