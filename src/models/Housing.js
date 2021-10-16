const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Apartment', 'Villa', 'House'], required: true },
  year: { type: Number, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  places: { type: Number, required: true },
  rented: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

housingSchema.method('isOwner', function (userId) {
  return this.owner == userId;
});
housingSchema.method('availability', function () {
  return this.places - this.rented.length;
});

housingSchema.method('isAvailable', function () {
  return this.places - this.rented.length > 0;
});

housingSchema.method('youRented', function (userId) {
  return this.rented.includes(userId);
});

housingSchema.method('rentProperty', function (user) {
  this.rented.push(user);
  this.save();
});
housingSchema.method('showGuests', function () {
  return this.rented.join(', ');
});
const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;
