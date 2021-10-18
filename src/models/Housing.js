const mongoose = require('mongoose');
const validator = require('validator');

const housingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 6 },
  type: {
    type: String,
    enum: {values:['Apartment', 'Villa', 'House'], message:'Please use one of the options!'},
    required: true,
  },
  year: { type: Number, required: true, min: 1850, max: 2021 },
  city: { type: String, required: true, minlength: 4 },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: 'Must be valid url.',
    },
  },
  description: { type: String, required: true, maxlength: 60 },
  places: {
    type: Number,
    required: true,
    min: [0, 'Cannot add negative value'],
    max: [10, 'Value must be between 0 and 10'],
  },
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
  return Boolean(this.rented.find((x) => x._id == userId));
});

housingSchema.method('rentProperty', function (user) {
  this.rented.push(user);
  this.save();
});
housingSchema.method('showGuests', function () {
  return this.rented.map((x) => x.name).join(', ');
});
const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;
