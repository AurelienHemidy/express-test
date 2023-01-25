const { Pokemon } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');

const deletePokemon = (req, res) => {
  const id = +req.params.id;

  Pokemon.findByPk(req.params.id).then((pokemonToDestroy) => {
    if (!pokemonToDestroy) {
      const errorMessage = 'Could not find that pokemon. Try another id.';
      res.status(400).json(error(errorMessage));
    }

    return Pokemon.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.send(success(`Le pokemon n°${id} a bien été supprimé !`, pokemonToDestroy));
      })
      .catch((err) => {
        const errorMessage = 'Could not delete that pokemon. Try again in a few moments.';
        res.status(500).json(error(errorMessage, err));
      });
  });
};

module.exports = {
  deletePokemon,
};
