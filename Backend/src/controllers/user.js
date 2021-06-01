const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../middleware/private_key')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const user = require('../models/user')

// var Cryptr = require('cryptr');

// var cryptr = new Cryptr('myTotalySecretKey');

exports.signup = (req, res) => {
  // console.log('user:'+ req.body.username +' password: '+ req.body.password)
  let regexPassword = /[\w.-]{8,16}/;
  if(!regexPassword.test(req.body.password)){
    return res.status(400).json({ message: "Le password doit être compris entre 8 et 16 caractères."})
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.create({
      ...req.body,
      password: hash,
    })
    .then(user => {
      console.log(user.toJSON())
      return res.status(201).json({ message: `L'utilisateur ${user.username} a bien été créé !`})
    })
    .catch(error =>{
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "Les données ne sont pas correctes."
      res.status(400).json({ message, data: error })
    })
  })
  .catch(error => {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    const message = "L'inscription a échouée. Réessayez dans quelques instants."
    res.status(500).json({ message, data: error })
  })
}

exports.login = (req, res) => {
  
    User.findOne({ where: { email: req.body.email } })
    .then(user => {

        if(!user){
            const message = `L'utilisateur demandé n'existe pas.`
            return res.status(404).json({ message })
        }

      bcrypt.compare(req.body.password, user.password)
      .then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorect`
          return res.status(401).json({ message })
        }

        //JWT
        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
        )

        const message = `L'utilisateur a été connecté avec succès`
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
        return res.json({ message, data: error })
    })
}
exports.delete = (req,res) => {
  User.destroy({ where: { id: req.body.id}})
  .then(() => {
    return res.status(200).json({ message: `L'utilisateur ${req.body.userId} a bien été supprimé !`})
  })
  .catch(error => {
    const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`
    return res.status(500).json({ message: error, data: message  })
  })
}