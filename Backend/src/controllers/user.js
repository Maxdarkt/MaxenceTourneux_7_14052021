const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

// var Cryptr = require('cryptr');

// var cryptr = new Cryptr('myTotalySecretKey');

exports.signup = (req, res) => {
  // console.log('user:'+ req.body.username +' password: '+ req.body.password)
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.create({
      username: req.body.username,
      password: hash
    })
    .then(user => {
      console.log(user.toJSON())
      return res.status(201).json({ message: `L'utilisateur ${user.username} a bien été créé !`})
    })
  })
  .catch(error => {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    const message = "Problème d'inscription"
    res.status(500).json({ message, data: error })
  })
}

exports.login = (req, res) => {
  
    User.findOne({ where: { username: req.body.username } })
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