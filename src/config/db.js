const mongoose = require('mongoose');

const initDb = (connectionString) => {
  return mongoose.connect(connectionString);
};
module.exports = initDb;
