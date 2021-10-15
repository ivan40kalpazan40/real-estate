const express = require('express');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const router = express.Router();

const renderAll = (req, res) => {
  res.render('housing/recent');
};

const renderCreate = (req, res) => {
  res.render('housing/create');
};

router.get('/', renderAll);
router.get('/create', isLogged, renderCreate);

module.exports = router;
