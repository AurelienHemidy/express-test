const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
let pokemons = require('./mock-pockemon.js');

const bcrypt = require('bcrypt');

const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  port: 3307,
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((err) => {
    console.log(err);
  });

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  sequelize.sync({ force: true }).then(() => {
    console.log('La base de données "Pokedex" a bien été synchronisée.');

    pokemons.forEach((pokemon) =>
      Pokemon.create({
        ...pokemon,
      }).then((pokemon) => null)
    );

    bcrypt.hash('root', 10).then((hash) => {
      User.create({
        email: 'root@localhost.com',
        username: 'root',
        password: hash,
      }).then((user) => null);
    });
  });
};

module.exports = { initDb, Pokemon, User };
