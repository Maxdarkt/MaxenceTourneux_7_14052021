const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postsCtrl = require('../controllers/posts')
const commentsCtrl = require('../controllers/comments')
const likeCtrl = require('../controllers/like')

//Routes du système CRUD
router.get('/', auth, postsCtrl.getAllPosts)
router.post('/', auth, multer, postsCtrl.createPost)
router.get('/:id', auth, postsCtrl.getOnePost)
router.put('/:id', auth, multer, postsCtrl.modifyPost)
router.delete('/:id', auth, postsCtrl.deletePost)

//Routes des comments
router.post('/:id/comment', auth, commentsCtrl.createComment)
router.get('/:id/comments', auth, commentsCtrl.getAllCommentsByPostId)
router.delete('/:id/comment', auth, commentsCtrl.deleteCommentByPostId)

//Route MAJ du nombre de commentaires par post
router.put('/nbComment/:id', auth, postsCtrl.numberOfComments)

//Routes pour Liker commentaires
router.post('/:id/like', auth, likeCtrl.likePost)


module.exports = router;