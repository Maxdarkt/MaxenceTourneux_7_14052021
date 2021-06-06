<template>
<div>
<div class="post" v-for="post in posts" :key="post">
    <div class="post__head">
      <div>
        <p>{{post.username}}</p>
      </div>
      <div v-if="loading == false && time(post.created, post.id)">
        <p v-if="timePost[post.id].year == 1">Il y a {{timePost[post.id].year}} an</p>
        <p v-else-if="timePost[post.id].year > 1">Il y a {{timePost[post.id].year}} ans</p>
        <p v-else-if="timePost[post.id].day == 1">Il y a {{timePost[post.id].day}} jour</p>
        <p v-else-if="timePost[post.id].day > 1">Il y a {{timePost[post.id].day}} jours</p>
        <p v-else-if="timePost[post.id].min == 1">Il y a {{timePost[post.id].min}} minute</p>
        <p v-else-if="timePost[post.id].min > 1">Il y a {{timePost[post.id].min}} minutes</p>
      </div>
    </div>
    <div class="post__title">
      <p>{{post.title}}</p>
    </div>
    <div class="post__view" :style="{ 'background-image': 'url(' + post.imageUrl + ')'}">
    </div>
    <div class="post__description">
      <p>{{post.description}}</p>
    </div>
    <div class="post__cont">
        <div class="post__cont__foot">
            <p class="like"><i class="far fa-thumbs-up fa-2x"></i><span>{{post.userIdLiked}}</span></p>
            <p class="like"><i class="far fa-thumbs-down fa-2x"></i><span>{{post.userIdDisliked}}</span></p>
            <p class="comments"><i @click="displayComments(post.id), loadComments(post.id)" class="far fa-comment-alt fa-2x"></i><span>5 comments</span></p>
        </div>
        <div class="post__cont__action">
            <button class="button button--green" v-if="user.id == post.userId" @click="modifyPost(post.id)" >Modifier</button>
            <button class="button button--red" v-if="user.id == post.userId || user.admin == true">Supprimer</button>
        </div>
    </div>
    <Comments v-if="loading == false" :postId="post.id" :displayCom="displayCom" :comments="comments"/>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex'
import Comments from '../components/Comments.vue'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
    name: 'Home',
    components: {
    Comments
    },
    data() {

        return {
            posts: [''],
            displayCom: [{"id": 0, "check": 0}],
            postId: 0,
            loading: true,
            comments: [],
            timePost: [],

        }
    },
    created () {
        instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;

    },
    async mounted () {
        this.loading = true //On attend la fin de la fonction pour charger les commentaires et récupérer les valeurs à transmettre

        await instance.get('post/')
        .then(response => { 
            this.posts = response.data.data
            for(let item of response.data.data) {
            this.displayCom[item.id] = ({"id" : item.id, "check" : 0})
            }
            })
        .catch(error => { error })
        .finally(() => {
            this.loading = false // On peut charger le composant
        });
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        displayComments: function(postId){// Gestion de l'affichage des commentaires avec un objet stocké dans un array => displayCom
            console.log('displayComments reçoit : '+ postId)
            for (let item of this.displayCom) {

                if(this.displayCom[item.id].id == postId && this.displayCom[item.id].check == 0){
                    this.displayCom[item.id] = ({"id" : postId, "check" : 1})
                    //console.log(this.displayCom[item.id])
                } else if (this.displayCom[item.id].id == postId && this.displayCom[item.id].check == 1){
                    this.displayCom[item.id] = ({"id" : postId, "check" : 0})
                    //console.log(this.displayCom[item.id])
                }
            }
            //console.log(this.displayCom)
        },
        loadComments: function(postId){
            //console.log('loadComments :' +postId)
            this.loading = true; //On attend la fin de la fonction pour charger les commentaires et récupérer les valeurs à transmettre

            instance.get('post/'+ postId +'/comments/' )
            .then(response => { 
                this.comments[postId] = response.data.data
                })
            .catch(error => { error })
            .finally(() => {
                this.loading = false // On peut charger le composant
            });
        },
        time: function (dateCreated, postId) {

            let dateMysql = Date.parse(dateCreated)
            let dateNow = Date.now()

            var diff = {}                           // Initialisation du retour
            var tmp = dateNow - dateMysql;
        
            tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
            diff.sec = tmp % 60;                    // Extraction du nombre de secondes
        
            tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
            diff.min = tmp % 60;                    // Extraction du nombre de minutes
        
            tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
            diff.hour = tmp % 24;                   // Extraction du nombre d'heures
            
            tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
            diff.day = tmp;

            tmp = Math.floor((tmp-diff.day)/365);   // Nombre de jours restants
            diff.year = tmp;

            this.timePost[postId] = diff

            return this.timePost
        },
        modifyPost(postId){
            this.$emit('eventModify', {
                modifyPostId: postId
            })
            console.log('emit: '+postId)
        }
    }
} 
</script>

<style lang="scss">
@import '../sass/_variables';

.post{
  //background-color: rgb(209, 204, 204);
  padding: 10px;
  border: 2px solid #BAD5EA;
  border-radius: 15px;
  margin:20px;
  &__head{
    display: flex;
    justify-content: flex-start;
    p{
      margin-right: 20px;
    }
  }
  &__title{
    display: flex;
    justify-content: flex-start;
  }
  &__view{
    height:250px;
    border-radius: 15px;
    background-position: center;
    background-size: cover;
  }
  &__description{
    display: flex;
    justify-content: flex-start;
    text-align: justify;
  }
  &__cont{
    display: flex;
    justify-content: space-between;
    align-items: center;  
        &__foot{  
                display: flex;
                justify-content: flex-start;
            p{
                margin-right:10px;
            }
            &__comments{
                background-color: rgb(202, 198, 198);
            }    
        }
        &__action{
            width: 350px;  
            display: flex;
            justify-content: space-around;
            align-items: center;
            .button{
                width: 150px;
            }
        } 
   
    }
    .like, .comments{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        span{
            margin-top:5px;
        }
    }
    .comments{
        align-self: flex-end;
        i{
            cursor: pointer;
        }
    }
}
</style>