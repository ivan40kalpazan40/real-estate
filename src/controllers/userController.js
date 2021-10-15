const express = require('express');
const userServices = require('../services/userServices');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('user/login');
};

const renderRegister = (req, res) => {
  res.render('user/register');
};

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

router.get('/login', renderLogin);
router.post('/register', registerUser);
router.get('/register', renderRegister);
module.exports = router;
