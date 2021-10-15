const Housing = require('../models/Housing');

const getHousings = async () => await Housing.find({}).lean();

const getOne = async (id) => await Housing.findOne({ _id: id }).lean();
const create = async (
  housingName,
  type,
  year,
  city,
  image,
  description,
  places
) => {
  const housing = await Housing.create({
    name: housingName,
    type,
    year,
    city,
    image,
    description,
    places,
  });
  return housing;
};
const housingService = { create, getHousings, getOne };
module.exports = housingService;
