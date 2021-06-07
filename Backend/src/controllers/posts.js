const { Post } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Op } = require('sequelize')
const { response } = require('express')
const fs = require('fs')
  

exports.createPost = (req, res) => {
  //récupérer requete au format form/data pour envoyer desfichiers
  //donc il faudra utliser JSON.parse(req.body."post")
  //const postObject = JSON.parse(req.body)
  const postObject = req.body
  console.log('nom multer config :' + req.file.filename)
  var newObject = {
    userId: postObject.userId,
    username: postObject.username,
    title: postObject.title,
    description: postObject.description,
    usersLiked: '0',
    usersDisliked: '0',
    userIdLiked: '0',
    userIdDisliked: '0'
  }

    Post.create({
      ...newObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
      .then(post => {
        const message = `Le post ${req.body.title} a bien été crée.`
        res.status(200).json({ message: "ok"})
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
    //récupérer requete au format form/data pour envoyer fichier
  //donc il faudra utliser JSON.parse(req.body."thing")
    const id = req.params.id
    if(!req.file){
      Post.findByPk(id)
      .then(post => {
        if(post === null){
          const message = `Le post demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const postObject = post.dataValues
  
        Post.update({
          ...post.dataValues,
          username: req.body.post.username,
          title: req.body.post.title,
          description: req.body.post.description,
          usersLiked: postObject.usersLiked,
          usersDisliked: postObject.usersDisliked
        }, { where: { id: id } })
        .then((post) => {
          const message = `Le post ${post.title} a bien été modifié.`
          res.status(200).json({message, data: post })
        })
        .catch(error => {
          res.status(400).json({ error })
          console.log({ error })
        })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error})
      })
    } else {

      Post.findByPk(id)
      .then(post => {
        if(post === null){
          const message = `Le post demandé n'exsite pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const postObject = post.dataValues

        const filename = postObject.imageUrl.split('/images/')[1];
        fs.unlink(`src/images/${filename}`, (error)=> {
          if(error){
            throw error;
          }

          Post.update({
            ...post.dataValues,
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
            usersLiked: postObject.usersLiked,
            usersDisliked: postObject.usersDisliked,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }, { where: { id: id } })
          .then((post) => {
            const message = `Le post ${post.title} a bien été modifié.`
            res.status(200).json({message, data: post })
          })
          .catch(error => {
            res.status(400).json({ error })
            console.log({ error })
          })
        })  
      })
      .catch(error => {
        const message = `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error})
      })
    }   
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
        res.status(200).json({ message, data: rows })
      })
    } else {
      Post.findAll({ order: [['created', 'DESC']]})//Tri ASC
      // .then(posts => {
      //   console.log('GETAllPosts :' + posts)
      //   res.status(200).json({ posts })
      // })
      // .catch(function(error) {
      //   console.log(error)
      //   res.status(500)
      // })
      .then(posts => {
        const message = 'La liste des posts a bien été récupérée.'
        res.status(200).json({ message, data: posts })
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