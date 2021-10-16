const Housing = require('../models/Housing');

const getHousings = async () => await Housing.find({}).lean();

const getOne = async (id) => await Housing.findOne({ _id: id });
const create = async (
  housingName,
  type,
  year,
  city,
  image,
  description,
  places,
  user
) => {
  const housing = await Housing.create({
    name: housingName,
    type,
    year,
    city,
    image,
    description,
    places,
    owner: user,
  });
  return housing;
};

const updateOne = async (id, update) => {
  return await Housing.findOneAndUpdate({ _id: id }, update, {
    runValidators: true,
  });
};

const deleteOne = async (id) => {
  return await Housing.findOneAndDelete({ _id: id }, { runValidators: true });
};

const housingService = {
  create,
  getHousings,
  getOne,
  updateOne,
  deleteOne,
};
module.exports = housingService;
