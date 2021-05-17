const { Sequelize, DataTypes } = require('sequelize')
const PostModel = require('../models/post')
const UserModel = require('../models/user')
const CommentModel = require('../models/comment')
const Posts = require('./mock-post')
const Comments = require('./mock-comments')
const bcrypt = require('bcrypt')
const comments = require('../models/comment')
  
const sequelize = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Post = PostModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes) 
const Comment = CommentModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    Posts.map(post => {
      Post.create({
        userId: post.userId,
        title: post.title,
        imageUrl: post.imageUrl,
        description: post.description,
        usersLiked: post.usersLiked,
        usersDisliked: post.usersDisliked,
        userIdLiked: post.userIdLiked,
        userIdDisliked: post.userIdDisliked
      }).then(post => console.log(post.toJSON()))
    })

    Comments.map(comment => {
      Comment.create({
        id: comment.id,
        userId: comment.userId,
        postId: comment.postId,
        message: comment.message,
        usersLiked: comment.usersLiked,
        usersDisliked: comment.usersDisliked,
        userIdLiked: comment.userIdLiked,
        userIdDisliked: comment.userIdDisliked,
      }).then(comment => console.log(comment.toJSON()))
    })

    bcrypt.hash('userTest', 10)
    .then(hash => {
      User.create({
        username: 'userTest',
        email: 'userTest@test.com',
        password: hash,
        admin: false
      })
      .then(user => console.log(user.toJSON()))
    })


    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Post, User
}