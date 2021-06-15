<template>
<div>

<div class="post" v-for="post in posts" :key="post">
    <div class="post__head">
      <div>
        <p>{{post.username}}</p>
      </div>
      <div class="time" v-if="loading == false && time(post.created, post.id)">
        <p v-if="timePost[post.id].year == 1">Il y a {{timePost[post.id].year}} an</p>
        <p v-else-if="timePost[post.id].year > 1">Il y a {{timePost[post.id].year}} ans</p>
        <p v-else-if="timePost[post.id].day == 1">Il y a {{timePost[post.id].day}} jour</p>
        <p v-else-if="timePost[post.id].day > 1">Il y a {{timePost[post.id].day}} jours</p>
        <p v-else-if="timePost[post.id].hour == 1">Il y a {{timePost[post.id].hour}} heure</p>
        <p v-else-if="timePost[post.id].hour > 1">Il y a {{timePost[post.id].hour}} heures</p>
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
    <div class="post__cont" v-if="loading == false">
        <div class="post__cont__foot">
            <Likes :postId="post.id" :usersLiked="post.usersLiked" :usersDisliked="post.usersDisliked" :post="post" @eventLiked="refreshLikes" :key="likes"/>

            <p class="comments"><i @click="loadComments(post.id, post.numberOfComments)" class="far fa-comment-alt fa-2x"></i>
            <NumberComs :key="refreshNbOfComs" :numberOfComments="displayCom[post.id].numberOfComments" />
            </p>
        </div>
        <div class="post__cont__action">
            <button class="button button--green" v-if="user.id == post.userId" @click="modifyPost(post.id)">Modifier</button>
            <button class="button button--red" v-if="user.id == post.userId || user.admin == true" @click="deletePost(post.id)" >Supprimer</button>
        </div>
    </div>
    <Comments :key="refreshComs" v-if="loading== false && displayCom[post.id].id == post.id && displayCom[post.id].check == 1" :comments="comments" :postId="post.id" @eventRefreshCom="refreshCom(post.id)" @eventRereshNbCom="refreshNBComs"/>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex'
import NumberComs from '../components/NumberComs.vue'
import Comments from '../components/Comments.vue'
import Likes from '../components/Likes.vue'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
    name: 'Home',
    components: {
    NumberComs,    
    Comments,
    Likes
    },
    data() {

        return {
            posts: [''],
            postId: 0,
            loading: true,
            displayCom: [],
            comments: [],
            timePost: [],
            openComs: [],
            refreshComs: 0,
            refreshNbOfComs: 0,
            likes: 0

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
            for(let i in this.posts) {
            this.displayCom[this.posts[i].id] = ({"id" : this.posts[i].id, "check" : 0, "numberOfComments": this.posts[i].numberOfComments})
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
        displayComments(postId, numberOfComs){// Gestion de l'affichage des commentaires avec un objet stocké dans un array => displayCom
            // console.log('displayComments reçoit : '+ postId)
                if(this.displayCom[postId].id == postId && this.displayCom[postId].check == 0){
                    this.displayCom[postId] = ({"id" : postId, "check" : 1, "numberOfComments": numberOfComs})
                } else if (this.displayCom[postId].id == postId && this.displayCom[postId].check == 1){
                    this.displayCom[postId] = ({"id" : postId, "check" : 0, "numberOfComments": numberOfComs})
                }
        },
        loadComments(postId, numberOfComs){
            // console.log('loadComments :' + postId)

            instance.get('post/'+ postId +'/comments/' )
            .then(response => { 
                this.comments[postId] = response.data.data
                })
            .catch(error => { error })
            .finally(() => {
                this.displayComments(postId, numberOfComs)
            });
        },
        time (dateCreated, postId) {

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
        },
        deletePost(postId){
            if(confirm('Confirmez-vous la suppression de ce post ?')){
            instance.delete('post/'+ postId)
            .then(() => { 
                this.$emit('eventDelete')
            })
            .catch(error => { error })
            } else {
                return
            }
        },
        async refreshCom(postId) {
            await instance.get('post/'+ postId +'/comments' )
            .then(response => { 
                this.comments[postId] = response.data.data
                })
            .catch(error => { error })
            this.refreshComs ++
        },
        refreshNBComs(payload){

            this.displayCom[payload.postId] = ({"id" : payload.postId, "check" : 1, "numberOfComments": payload.number})

            this.refreshNbOfComs ++
        },
        async refreshLikes() {

            await instance.get('post/')
            .then(response => { 
                this.posts = response.data.data
                for(let i in this.posts) {
                this.displayCom[this.posts[i].id] = ({"id" : this.posts[i].id, "check" : 0, "numberOfComments": this.posts[i].numberOfComments})
                }
                this.likes ++
            })
            .catch(error => { error })

        }

    }
} 
</script>

<style lang="scss">
@import '../sass/_variables';
@import '../sass/_mixins';

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
    height:500px;
    border-radius: 15px;
    background-position: center;
    background-size: cover;
    @include tablette-only{
        height: 350px;
    }
    @include mobile-only{
        height:250px;
    }

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
                width: 100%;
            p{
                margin-right:15px;
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
            @include mobile-only{
                width: 250px;
            }
            .button{
                width: 150px;
                margin-left: 15px;
                @include mobile-only{
                    width: 120px;
                }
            }
        } 
   
    }
    .comments{
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
.time{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.8rem;
    color: #aaaaaa;
    font-style: italic;
    width:60%;
}
</style>