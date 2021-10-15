const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/utils');

exports.auth = function (req, res, next) {
  const token = req.cookies['userCookie'];
  if (token) {
    jwt.verify(token, SECRET(), (err, decodedToken) => {
      if (err) {
        throw err;
      }
      req.user = decodedToken;
      next();
    });
  } else {
    next();
  }
};

exports.isLogged = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect('/user/login');
};

exports.isGuest = function (req, res, next) {
  if (!req.user) {
    return next();
  }
  return res.redirect('/');
};
