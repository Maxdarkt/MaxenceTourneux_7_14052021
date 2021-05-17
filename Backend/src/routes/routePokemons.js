const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const pokemonsCtrl = require('../controllers/pokemons');

router.get('/', auth, pokemonsCtrl.getAllPokemons);
router.post('/', auth, pokemonsCtrl.createPokemon);
router.get('/:id', auth, pokemonsCtrl.getOnePokemon);
router.put('/:id', auth, pokemonsCtrl.modifyPokemon);
router.delete('/:id', auth, pokemonsCtrl.deletePokemon);

module.exports = router;