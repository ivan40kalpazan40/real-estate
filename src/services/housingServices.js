const Housing = require('../models/Housing');

const getHousings = async () => await Housing.find({}).lean();

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
const housingService = { create, getHousings };
module.exports = housingService;
