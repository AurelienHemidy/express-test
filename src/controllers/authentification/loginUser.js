const { User } = require('../../db/sequelize');
const { success, error } = require('../../../helpers/helper');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

const loginUser = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        const errorMessage = 'Username or password incorrect.';
        return res.status(401).json(error(errorMessage, err));
      }

      bcrypt.compare(req.body.password, user.password).then((isPasswordValid) => {
        const errorMessage = 'Username or password incorrect.';
        if (!isPasswordValid) return res.status(401).json(error(errorMessage, err));

        // JWT
        const token = jwt.sign({ userId: user.id }, privateKey, {
          expiresIn: '24h',
        });

        return res.json(success(`User Login successfully`, token));
      });
    })
    .catch((err) => {
      const errorMessage = 'Could not login that user. Try again in a few moments.';
      return res.status(500).json(error(errorMessage, err));
    });
};

module.exports = {
  loginUser,
};
