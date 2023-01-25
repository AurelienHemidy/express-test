const { Pokemon } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');

const getPokemon = (req, res) => {
  //   Pokemon.findAll({
  //     where: {
  //       id: id,
  //     },
  //   }).then((pokemon) => {
  //     res.json(success('Un pokémon a bien été retrouvé !', pokemon));
  //   });

  // OR
  Pokemon.findByPk(req.params.id)
    .then((pokemon) => {
      res.json(success('Un pokémon a bien été retrouvé !', pokemon));
    })
    .catch((err) => {
      const errorMessage = 'Could not retrieve that pokemon. Try again in a few moments.';
      res.status(500).json(error(errorMessage, err));
    });
};

module.exports = {
  getPokemon,
};
