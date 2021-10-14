const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Apartment', 'Villa', 'House'], required: true },
  year: { type: Number, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  pieces: { type: Number, required: true },
  rented: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;
