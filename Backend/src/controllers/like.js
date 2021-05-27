const { Post } = require('../db/sequelize')

exports.likePost = (req, res, next) => {
    let userId = req.body.userId;
    let like = req.body.like;
    // let postObject = {};
    let checkUserIdLikes = false;
    let checkUserIdDislikes = false;
    let id = req.params.id;

    return Post.findByPk(id)
    .then(post => {
        let userLiked = post.usersLiked;
        let usersDisliked = post.usersDisliked;

        //Modifier modèle post avec getter et setter pour array
        //tester le array avec if else if ...
        if(usersLiked > 0){

        }
    })
    .catch(error => {
        const message = `Le like n'a pas pu être pris en compte. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error})
    })

    console.log(req.body)

}