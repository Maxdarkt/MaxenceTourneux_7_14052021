const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const pokemonsRoutes = require('./src/routes/routePokemons')
const loginRoutes = require('./src/routes/routeUsers')

 
const app = express()

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))//URL en console
    .use(bodyParser.json())

sequelize.initDb()

//les points de terminaisons :
app.use('/api/pokemons', pokemonsRoutes)
app.use('/api/auth', loginRoutes)

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

//routes
// app.use('/images', express.static(path.join(__dirname, 'images')));

//On ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
})

module.exports = app