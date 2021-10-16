const express = require('express');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const housingServices = require('../services/housingServices');
const router = express.Router();

const renderAll = async (req, res) => {
  try {
    const housings = await housingServices.getHousings();
    housings.sort((a, b) => b.year - a.year);
    res.render('housing/recent', { user: req.user, housings });
  } catch (error) {
    res.render('404', { error, user: req.user });
  }
};

const renderCreate = (req, res) => {
  res.render('housing/create', { user: req.user });
};

const renderDetails = async (req, res) => {
  const housingId = req.params.id;
  try {
    const housing = await housingServices.getOne(housingId);
    const isOwner = housing.isOwner(req.user._id);
    const isAvailable = housing.isAvailable();
    const availability = housing.availability();
    const youRented = housing.youRented(req.user._id);
    res.render('housing/details', {
      user: req.user,
      housing: housing._doc,
      isOwner,
      isAvailable,
      availability,
      youRented,
    });
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user: req.user });
  }
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
      places,
      req.user
    );
    console.log('Housing Created!');
    res.redirect('/housing');
  } catch (error) {
    res.render('404', { error, user: req.user });
  }
};

const renderEdit = async (req, res) => {
  const housingId = req.params.id;
  try {
    const housing = await housingServices.getOne(housingId);
    res.render('housing/edit', { housing: housing._doc });
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user: req.user });
  }
};

router.get('/', renderAll);
router.get('/create', isLogged, renderCreate);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', renderEdit);
router.post('/create', isLogged, createHousing);

module.exports = router;
