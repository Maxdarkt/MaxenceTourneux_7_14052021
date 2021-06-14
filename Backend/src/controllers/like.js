const { Post } = require('../db/sequelize')

exports.likePost = (req, res, next) => {
    //Déclaration des variables
    let userId = req.body.like.userId
    let like = req.body.like.like
    let postId = req.body.like.postId
    let id = req.params.id
    //console.log(postId, userId, like, id)

    // let postObject = {};

    //Déclaration des vérifications des userId qui ont liké ou disliké
    let checkUserIdLikes = false
    let checkUserIdDislikes = false

    //On récupère le post concerné avec l'id
    Post.findByPk(id)
    .then(post => {

        //on récupère les utilisateurs qui ont liké ou disliké en array
        let userIdLiked = post.dataValues.userIdLiked.split(',')
        let userIdDisliked = post.dataValues.userIdDisliked.split(',')
        let usersLiked = post.dataValues.usersLiked
        let usersDisliked = post.dataValues.usersDisliked

        //on vérifie si l'userId a déjà voté en like
        for (let element of userIdLiked) {
            if(userId == element) {
                checkUserIdLikes = true
            }
        }
            
        //on vérifie si l'userId a déjà voté en dislike
        for (let element of userIdDisliked) {
            if(userId == element) {
                checkUserIdDislikes = true
            }
        }

        //Si jamais le like présente une erreure != 1 0 -1
        if (like > 1) {
            console.log("erreure : le like est = " + like);
            res.status(400).json({ message: "erreur de like frontend // backend" });
        }
        //Un utilisateur veut liker pour la 1ère fois
        else if(like == 1 && checkUserIdLikes === false && checkUserIdDislikes === false) {
            userIdLiked.push(userId)

            Post.update({
                ...post.dataValues,
                usersLiked: usersLiked + 1,
                userIdLiked: userIdLiked.join()
                }, { where: { id: id } })
            .then((post) => {
                const message = `New Like !`
                res.status(200).json({message, data: post })
            })
            .catch(error => {
                res.status(400).json({ error })
                console.log({ error })
            })
        }
        else if(like == 0) {//un utilisateur veut annuler le (Dis)Like

            if(checkUserIdLikes === true){//Annuler le Like

                for (let i in userIdLiked){
                    if (userIdLiked[i] == userId) {
                        userIdLiked.splice(i, 1);
                      }
                      i++
                }

                Post.update({
                    ...post.dataValues,
                    usersLiked: usersLiked - 1,
                    userIdLiked: userIdLiked.join()
                    }, { where: { id: id } })
                .then((post) => {
                    const message = `Like annulé !`
                    res.status(200).json({message, data: post })
                })
                .catch(error => {
                    res.status(400).json({ error })
                    console.log({ error })
                })

            }else if(checkUserIdDislikes === true){//Annuler le Dislike

                for (let i in userIdDisliked){
                    if (userIdDisliked[i] == userId) {
                        userIdDisliked.splice(i, 1);
                      }
                      i++
                }

                Post.update({
                    ...post.dataValues,
                    usersDisliked: usersDisliked - 1,
                    userIdDisliked: userIdDisliked.join()
                    }, { where: { id: id } })
                .then((post) => {
                    const message = `Dislike annulé !`
                    res.status(200).json({message, data: post })
                })
                .catch(error => {
                    res.status(400).json({ error })
                    console.log({ error })
                })

            }

        }
        else if(like == -1 && checkUserIdDislikes === false && checkUserIdLikes === false) {
            userIdDisliked.push(userId)

            Post.update({
                ...post.dataValues,
                usersDisliked: usersDisliked + 1,
                userIdDisliked: userIdDisliked.join()
                }, { where: { id: id } })
            .then((post) => {
                const message = `New Like !`
                res.status(200).json({message, data: post })
            })
            .catch(error => {
                res.status(400).json({ error })
                console.log({ error })
            })
        }
        else if(like ==-1 && checkUserIdDislikes === false && checkUserIdLikes === true) {
            const message = "Un utilisateur ne peut pas Liker ou disliker 2 fois"
            res.status(400).json({ message, data: error})
        }
        else if(like == 1 && checkUserIdDislikes === false && checkUserIdLikes === true) {
            const message = "Un utilisateur ne peut pas Liker ou disliker 2 fois"
            res.status(400).json({ message, data: error})
        }
    })
    .catch(error => {
        const message = `Le like n'a pas pu être pris en compte. Réessayez dans quelques instants.`
        console.log(error)
        res.status(500).json({ message, data: error})
    })

}