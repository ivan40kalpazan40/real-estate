const express = require('express');

const routes = require('./routes');
const { connectionString, PORT } = require('./config/utils');

const initDb = require('./config/db');
const app = express();

require('./config/handlebars')(app);
require('./config/express.config')(app);
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
