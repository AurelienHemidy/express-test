const { Pokemon } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');

const { Op } = require('sequelize');

const getAllPokemons = (req, res) => {
  const limit = +req.query.limit || 5;
  // If name is specified, search for names
  if (req.query.name) {
    const name = req.query.name;

    // Check if name query param is long enough
    if (name.length <= 2) {
      const errorMessage = "'name' query param should be longer than 2 characters";
      return res.status(400).json(error(errorMessage));
    }

    return Pokemon.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit: limit,
      order: ['name'],
    }).then((pokemons) => {
      res.json(success(`Pokemon List with name: ${name}`, pokemons));
    });
  } else {
    Pokemon.findAll({ order: ['name'], limit: limit })
      .then((pokemons) => {
        res.json(success('Pokemon List', pokemons));
      })
      .catch((err) => {
        const errorMessage = 'Could not retrieve all pokemons. Try again in a few moments.';
        res.status(500).json(error(errorMessage, err));
      });
  }
};

module.exports = {
  getAllPokemons,
};
