const express = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const router = express.Router();

router.use(homeController);
router.use('/user', userController);
module.exports = router;
