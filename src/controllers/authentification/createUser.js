const { User } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  User.create({
    ...req.body,
    password: hashPassword,
  })
    .then((newUser) => res.send(success(`User n°${newUser.id} has been added succesfully !`, newUser)))
    .catch((err) => {
      if (err instanceof ValidationError) {
        // Handle Unique key constraint
        if (err instanceof UniqueConstraintError) {
          return res.status(409).json(error(err.message, err));
        }

        return res.status(400).json(error(err.message, err));
      }

      const errorMessage = 'Could not create that user. Try again in a few moments.';
      res.status(500).json(error(errorMessage, err));
    });
};

module.exports = {
  createUser,
};
