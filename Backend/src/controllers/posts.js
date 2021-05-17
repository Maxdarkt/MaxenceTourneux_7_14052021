const { Post } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../middleware/auth')
const { Op } = require('sequelize')
  

exports.createPost = (req, res) => {
  //récupérer requete au format form/data pour envoyer fichier
  //donc il faudra utliser JSON.parse(req.body."thing")
    Post.create(
      {
        ...req.body,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      })
      .then(post => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: post })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = "Le post n'a pas pu être ajouté. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
}
  
exports.modifyPost = (req, res) => {
    const id = req.params.id
    Post.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Post.findByPk(id) //return est là pour éviter 2 catch
      .then(post => {
        if(post === null){
          const message = `Le post demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = `Le pokémon ${post.name} a bien été modifié.`
        res.json({message, data: post })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
} 

exports.getAllPosts = (req, res) => {
    if(req.query.name){//Si un paramètre est passé dans l'URL = Recherche
      const name = req.query.name

      if(name.length < 2){//Recherche si au moins 2 caractères
        const message = "Le terme de recherche doit contenir au moins 2 caractères."
        return res.status(400).json({ message })
      }

      const limit = parseInt(req.query.limit) || 5 //limit par défaut ou personnalisé
      return Post.findAndCountAll({ 
        where: {
          name: { // 'name' est la propriété du modèle post
            //[Op.eq]: name // Recherche exacte : Op.eq = name
            [Op.like]: `%${name}%`
            } 
        },
        order: ['name'],//order: ['name', 'DESC'], pour décroissant
        limit: limit //Limiter le nombre de résultats pour des recherches ouvertes de type 'a', 'e', ...
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} posts qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Post.findAll({ order: ['name'] })//Tri ASC
      .then(posts => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: posts })
      })
      .catch(error => {
          const message = `La liste des posts n'a pas pu être récupérée. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error})
      })
    }
}

exports.getOnePost =  (req, res) => {
    Post.findByPk(req.params.id)
      .then(post => {
        if(post === null){
          const message = `Le post demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: post })
      })
      .catch(error => {
        const message = "Le post n'a pas pu être récupéré. Réessayez dans quelques instants."
        res.status(500).json({ message, data : error })
      })
}

exports.deletePost = (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => {
      if(post === null){
        const message = `Le post demandé n'exsite pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const postDeleted = post;

      return Post.destroy({ //return est là pour retourné l'erreur au catch en bas...
        where: { id: post.id }//...pour éviter de taper 2 même blocs de code
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${postDeleted.id} a bien été supprimé.`
        res.json({message, data: postDeleted })
      })
    })
    .catch(error => {
      const message = `Le post n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
}