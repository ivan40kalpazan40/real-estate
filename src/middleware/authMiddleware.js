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
