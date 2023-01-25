const { Pokemon } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const createPokemon = (req, res) => {
  Pokemon.create(req.body)
    .then((newPokemon) => res.send(success(`Le pokemon n°${newPokemon.id} a bien été ajouté !`, newPokemon)))
    .catch((err) => {
      if (err instanceof ValidationError) {
        // Handle Unique key constraint
        if (err instanceof UniqueConstraintError) {
          return res.status(409).json(error(err.message, err));
        }

        return res.status(400).json(error(err.message, err));
      }

      const errorMessage = 'Could not create that pokemon. Try again in a few moments.';
      res.status(500).json(error(errorMessage, err));
    });
};

module.exports = {
  createPokemon,
};
