const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')
const { Op } = require('sequelize')

  

exports.createPokemon = (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = "Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
}
  
exports.modifyPokemon = (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id) //return est là pour éviter 2 catch
      .then(pokemon => {
        if(pokemon === null){
          const message = `Le pokemon demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `Le pokemon n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
} 

exports.getAllPokemons = (req, res) => {
    if(req.query.name){//Si un paramètre est passé dans l'URL = Recherche
      const name = req.query.name

      if(name.length < 2){//Recherche si au moins 2 caractères
        const message = "Le terme de recherche doit contenir au moins 2 caractères."
        return res.status(400).json({ message })
      }

      const limit = parseInt(req.query.limit) || 5 //limit par défaut ou personnalisé
      return Pokemon.findAndCountAll({ 
        where: {
          name: { // 'name' est la propriété du modèle pokemon
            //[Op.eq]: name // Recherche exacte : Op.eq = name
            [Op.like]: `%${name}%`
            } 
        },
        order: ['name'],//order: ['name', 'DESC'], pour décroissant
        limit: limit //Limiter le nombre de résultats pour des recherches ouvertes de type 'a', 'e', ...
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({ order: ['name'] })//Tri ASC
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
          const message = `La liste des pokemons n'a pas pu être récupérée. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error})
      })
    }
}

exports.getOnePokemon =  (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = `Le pokemon demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = "Le pokemon n'a pas pu être récupéré. Réessayez dans quelques instants."
        res.status(500).json({ message, data : error })
      })
}

exports.deletePokemon = (req, res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon => {
      if(pokemon === null){
        const message = `Le pokemon demandé n'exsite pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const pokemonDeleted = pokemon;

      return Pokemon.destroy({ //return est là pour retourné l'erreur au catch en bas...
        where: { id: pokemon.id }//...pour éviter de taper 2 même blocs de code
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
      const message = `Le pokemon n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
}