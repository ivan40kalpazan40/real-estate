const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('housing/recent');
});
module.exports = router;
