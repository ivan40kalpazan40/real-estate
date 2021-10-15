const express = require('express');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('user/login');
};
const renderRegister = (req, res) => {
  res.render('user/register');
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);
module.exports = router;
