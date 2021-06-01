const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const postsRoutes = require('./src/routes/routePosts')
const loginRoutes = require('./src/routes/routeUsers')
const path = require('path')
const { countReset } = require('console')
 
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))//URL en console
    .use(express.json())

sequelize.initDb()

//les points de terminaisons :
app.use('/api/post', postsRoutes)
app.use('/api/auth', loginRoutes)

// app.use('/images', express.static('images'))
app.use(express.static(__dirname))

  //Insomnia => Multer Erreur
  // app.use(function (err, req, res, next) {
  //   console.log('This is the invalid field ->', err.field)
  //   next(err)
  // })

//routes
// app.use('/images', express.static(path.join(__dirname, 'images')));

//On ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
})

module.exports = app