const { Sequelize, DataTypes } = require('sequelize')
const PostModel = require('../models/post')
const UserModel = require('../models/user')
const CommentModel = require('../models/comment')
const Posts = require('./mock-post')
const Comments = require('./mock-comments')
const bcrypt = require('bcrypt')
const comments = require('../models/comment')
require('dotenv').config();
  
let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DB_NAME_PROD, process.env.DB_USER_PROD, process.env.DB_MDP_PROD, {
    host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize(process.env.DB_NAME_DEV, process.env.DB_USER_DEV, process.env.DB_MDP_DEV, {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}


  
const Post = PostModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes) 
const Comment = CommentModel(sequelize, DataTypes)

//Initialisation de la BDD en phase de développement
// const initDb = () => {
//   return sequelize.sync({force: true}).then(_ => {
//     Posts.map(post => {
//       Post.create({
//         userId: post.userId,
//         username: post.username,
//         title: post.title,
//         imageUrl: post.imageUrl,
//         description: post.description,
//         usersLiked: post.usersLiked,
//         usersDisliked: post.usersDisliked,
//         userIdLiked: post.userIdLiked,
//         userIdDisliked: post.userIdDisliked
//       }).then(post => console.log(post.toJSON()))
//     })

//     Comments.map(comment => {
//       Comment.create({
//         id: comment.id,
//         userId: comment.userId,
//         username: comment.username,
//         postId: comment.postId,
//         message: comment.message,
//         usersLikedComment: comment.usersLikedComment,
//         usersDislikedComment: comment.usersDislikedComment,
//         userIdLikedComment: comment.userIdLikedComment,
//         userIdDislikedComment: comment.userIdDislikedComment,
//       }).then(comment => console.log(comment.toJSON()))
//     })

//     bcrypt.hash('userTest123!', 10)
//     .then(hash => {
//       User.create({
//         username: 'userTest',
//         email: 'userTest@test.com',
//         password: hash,
//         admin: false
//       })
//       .then(user => console.log(user.toJSON()))
//     })

//     bcrypt.hash('userGuest123!', 10)
//     .then(hash => {
//       User.create({
//         username: 'userGuest',
//         email: 'userGuest@test.com',
//         password: hash,
//         admin: false
//       })
//       .then(user => console.log(user.toJSON()))
//     })

//     bcrypt.hash('userAdmin123!', 10)
//     .then(hash => {
//       User.create({
//         username: 'userAdmin',
//         email: 'userAdmin@test.com',
//         password: hash,
//         admin: true
//       })
//       .then(user => console.log(user.toJSON()))
//     })


//     console.log('La base de donnée a bien été initialisée !')
//   })
// }
  
module.exports = { 
  //initDb,
  Post, User, Comment
}