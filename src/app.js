const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');
const { connectionString, PORT } = require('./config/utils');
const initDb = require('./config/db');
const app = express();

require('./config/handlebars')(app);
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);
initDb(connectionString())
  .then(() => {
    console.log('Connected to DB');
  })
  .then(() => {
    app.listen(PORT(), () => {
      console.log('Server is listening on port 5000....');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
