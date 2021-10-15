const express = require('express');
const userServices = require('../services/userServices');
const { addToken } = require('../services/authServices');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const router = express.Router();

// GET::LOGIN
const renderLogin = (req, res) => {
  res.render('user/login');
};

// GET::LOGOUT
const logoutUser = (req, res) => {
  res.clearCookie('userCookie').redirect('/');
};

// GET::REGISTER
const renderRegister = (req, res) => {
  res.render('user/register');
};

// POST::Login USER
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.login(username, password);
    const token = await addToken(user);
    res.cookie('userCookie', token, { httpOnly: true }).redirect('/');
  } catch (error) {
    console.log(error.message);
    res.render('404', { error });
  }
};

// POST::REGISTER USER
const registerUser = async (req, res) => {
  const { name, username, password, repeatPassword } = req.body;
  try {
    const user = await userServices.register(
      name,
      username,
      password,
      repeatPassword
    );
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.render('404', { error });
  }
};

router.get('/login', isGuest, renderLogin);
router.get('/logout', isLogged, logoutUser);
router.get('/register', isGuest, renderRegister);
router.post('/login', isGuest, loginUser);
router.post('/register', isGuest, registerUser);

module.exports = router;
