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

const updateOne = (id, update) => {
  //TODO
};
const housingService = { create, getHousings, getOne, updateOne };
module.exports = housingService;
