const { Pokemon } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const updatePokemon = (req, res) => {
  Pokemon.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return Pokemon.findByPk(req.params.id).then((pokemonUpdated) => {
        if (!pokemonUpdated) {
          const errorMessage = "That pokemon doesn't exist. Try another id";
          return res.status(404).json(error(errorMessage));
        }
        res.send(success(`Le pokemon n°${req.params.id} a bien été mis à jour !`, pokemonUpdated));
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        // Handle Unique key constraint
        if (err instanceof UniqueConstraintError) {
          return res.status(409).json(error(err.message, err));
        }
        return res.status(400).json(error(err.message, err));
      }

      const errorMessage = 'Could not update that pokemon. Try again in a few moments.';
      res.status(500).json(error(errorMessage, err));
    });
};

module.exports = {
  updatePokemon,
};
