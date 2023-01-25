const express = require('express');

const router = express.Router();

const { createUser } = require('../controllers/authentification/createUser');
const { loginUser } = require('../controllers/authentification/loginUser');

// GET ALL POKEMONS
router.post('/login/', loginUser);

// CREATE A POKEMON
router.post('/', createUser);

module.exports = router;
