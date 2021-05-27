const { Comment } = require('../db/sequelize')
const { ValidationError } = require('sequelize')

exports.createComment = (req, res) => {

    console.log(req.params.id)

      Comment.create({
        ...req.body
      })
        .then(post => {
          const message = `Le commentaire a bien été crée.`
          res.json({ message, data: post })
        })
        .catch(error => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
          }
          const message = "Le commentaire n'a pas pu être ajouté. Réessayez dans quelques instants."
          res.status(500).json({ message, data: error })
        })
}

exports.getAllCommentsByPostId = (req, res) => {
console.log(req.params.id)
    Comment.findAll({ where: { id: req.params.id }, order: [['created', 'DESC']]})//Tri ASC
    .then(comments => {
      const message = `Les commentaires du post N°${req.params.id} ont bien été récupérés`
      res.status(200).json({ message, data: comments })
    })
    .catch(error => {
        const message = `La liste des commentaires n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error})
    })
}