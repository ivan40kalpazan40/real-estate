const express = require('express');
const path = require('path');
const app = express();

require('./config/handlebars')(app);
app.use(express.static(path.resolve(__dirname, './public')));
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is listening on port 5000....');
});
