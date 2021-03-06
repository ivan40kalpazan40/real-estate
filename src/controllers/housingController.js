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
    const isAvailable = housing.isAvailable();
    const availability = housing.availability();
    const guests = await housing.showGuests();
    let isOwner = false;
    let youRented = false;
    if (Boolean(req.user)) {
      isOwner = housing.isOwner(req.user._id);
      youRented = housing.youRented(req.user._id);
    }
    res.render('housing/details', {
      user: req.user,
      housing: housing._doc,
      guests,
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
    res.render('housing/edit', { housing: housing._doc, user: req.user });
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user: req.user });
  }
};

const editHousing = async (req, res) => {
  const housingId = req.params.id;
  const { name, type, year, city, image, description, places } = req.body;
  try {
    const housing = await housingServices.updateOne(housingId, {
      name,
      type,
      year,
      city,
      image,
      description,
      places,
    });
    res.redirect(`/housing/${housingId}/details`);
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user: req.user });
  }
};

const deleteHousing = async (req, res) => {
  const housingId = req.params.id;
  try {
    await housingServices.deleteOne(housingId);
    res.redirect('/housing');
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user: req.user });
  }
};

const rentProperty = async (req, res) => {
  const housingId = req.params.id;
  const user = req.user;
  try {
    const housing = await housingServices.getOne(housingId);
    if (housing.isOwner(user._id)) {
      throw new Error('You cannot rent your own property!');
    }
    await housing.rentProperty(user);
    res.redirect(`/housing/${housingId}/details`);
  } catch (error) {
    console.log(error.message);
    res.render('404', { error, user });
  }
};

router.get('/', renderAll);
router.get('/create', isLogged, renderCreate);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', isLogged, renderEdit);
router.get('/:id/delete', isLogged, deleteHousing);
router.post('/:id/edit', isLogged, editHousing);
router.post('/create', isLogged, createHousing);
router.get('/:id/rent', isLogged, rentProperty);

module.exports = router;
