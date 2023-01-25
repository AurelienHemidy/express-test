const express = require('express');

const router = express.Router();

const { getAllPokemons } = require('../controllers/pokemonControllers/getAllPokemons');
const { getPokemon } = require('../controllers/pokemonControllers/getPokemon');
const { createPokemon } = require('../controllers/pokemonControllers/createPokemon');
const { updatePokemon } = require('../controllers/pokemonControllers/updatePokemon');
const { deletePokemon } = require('../controllers/pokemonControllers/deletePokemon');

const auth = require('../middlewares/authentification/auth');

// GET ALL POKEMONS
router.get('/', getAllPokemons);

// GET ONE POKEMON
router.get('/:id', getPokemon);

// CREATE A POKEMON
router.post('/', createPokemon);

// UPDATE A POKEMON
router.put('/:id', updatePokemon);

// DELETE A POKEMON
router.delete('/:id', deletePokemon);

module.exports = router;
