const express = require('express');
const app = express();
require('./config/handlebars')(app);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is listening on port 5000....');
});
