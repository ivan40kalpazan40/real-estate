const express = require('express');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const housingServices = require('../services/housingServices');
const router = express.Router();

const renderAll = (req, res) => {
  res.render('housing/recent', { user: req.user });
};

const renderCreate = (req, res) => {
  res.render('housing/create', { user: req.user });
};

const createHousing = async (req, res) => {
  const { name, type, year, city, image, description, places } = req.body;
  try {
    const housing = await housingServices.create(
      name,
      type,
      year,
      city,
      image,
      description,
      places
    );
    console.log('Housing Created!');
    res.redirect('/housing');
  } catch (error) {
    res.render('404', { error, user: req.user });
  }
};

router.get('/', renderAll);
router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createHousing);

module.exports = router;
