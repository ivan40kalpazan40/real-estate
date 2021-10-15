const express = require('express');
const housingServices = require('../services/housingServices');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await housingServices.getHousings();
    const housing = result.slice(-3);
    res.render('index', { user: req.user, housing });
  } catch (error) {
    res.render('404', { error, user: req.user });
  }
});
module.exports = router;
