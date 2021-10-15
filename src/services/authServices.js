const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/utils');

exports.passwordCompare = function (pass1, pass2) {
  return pass1 === pass2;
};

exports.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

exports.compareHashed = function (inputPassword, dbPassword) {
  return bcrypt.compare(inputPassword, dbPassword);
};

exports.addToken = function (user) {
  const payload = {
    _id: user._id,
    username: user.username,
    name: user.name,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET(), (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
