const express = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const housingController = require('./controllers/housingController');
const router = express.Router();

router.use(homeController);
router.use('/user', userController);
router.use('/housing', housingController);
module.exports = router;
