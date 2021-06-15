const express = require('express')
// const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const postsRoutes = require('./src/routes/routePosts')
const loginRoutes = require('./src/routes/routeUsers')
const path = require('path')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

 
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
    // .use(morgan('dev'))//URL en console
    .use(express.json())

app.get('/', (req, res) => {
  res.json('Hello Heroku !')
})

//routes
app.use('/images', express.static(path.join(__dirname, '/src/images')));

//Initialisation de la BDD en phase développement
//sequelize.initDb()

//les points de terminaisons :
app.use('/api/post', postsRoutes)
app.use('/api/auth', loginRoutes)

const limiter = rateLimit({
  windowMs: 15 *60 * 1000,
  max: 100
});

//sécurité
app.use(limiter);
app.use(helmet());

//On ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
})

module.exports = app