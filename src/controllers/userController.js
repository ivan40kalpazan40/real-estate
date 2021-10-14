const express = require('express');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('user/login');
};

router.get('/login', renderLogin);
module.exports = router;
