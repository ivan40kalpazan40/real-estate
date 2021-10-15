const Housing = require('../models/Housing');

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
const housingService = { create };
module.exports = housingService;
