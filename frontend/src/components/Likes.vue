<template>
<div class="like-container">
    <p class="like">
        <span v-if="post.userIdDisliked.includes(user.id)">
            <i class="far fa-thumbs-up fa-2x like__more like--disabled"   @click="like(postId, 1)" ></i>
        </span>
        <span v-else-if="post.userIdLiked.includes(user.id)">
            <i class="far fa-thumbs-up fa-2x like__more like--liked"   @click="like(postId, 1)" ></i>
        </span>
        <span v-else>
            <i class="far fa-thumbs-up fa-2x like__more"  @click="like(postId, 1)" ></i>
        </span>

        <span>{{usersLiked}}</span>
    </p>
    <p class="like">
        <span v-if="post.userIdLiked.includes(user.id)">
            <i class="far fa-thumbs-down fa-2x like__less like--disabled" @click="like(postId, -1)" ></i>
        </span>
        <span v-else-if="post.userIdDisliked.includes(user.id)">
            <i class="far fa-thumbs-down fa-2x like__less like--disliked"   @click="like(postId, -1)" ></i>
        </span>
        <span v-else>
            <i class="far fa-thumbs-down fa-2x like__less" @click="like(postId, -1)" ></i>
        </span>

        <span>{{usersDisliked}}</span>
    </p>
</div>

</template>

<script>
import { mapState } from 'vuex'
const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
    name: 'Likes',
    props:{
        postId: Number,
        usersLiked: Number,
        usersDisliked: Number,
        post: Object
    },
    data() {
        return{

        }
    },
    computed:{
        ...mapState(['user'])
    },
    created () {
        instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;

    },
    methods: {
        async like(postId, like) {

            let listOfuserIdLiked = this.post.userIdLiked.split(',')
            let listOfuserIdDisliked = this.post.userIdDisliked.split(',')

            const likeInfos = {
                userId: this.user.id,
                like: like,
                postId: postId
            }

            if(like == 1 && listOfuserIdLiked.includes(likeInfos.userId.toString())){
                likeInfos.like = 0

                await instance.post('post/'+postId+'/like', {
                    like: likeInfos})
                .then(() => {
                    this.$emit('eventLiked')
                    console.log()
                })
                .catch(error => console.log(error))
                return

            }if(like == -1 && listOfuserIdDisliked.includes(likeInfos.userId.toString())){
                likeInfos.like = 0

                await instance.post('post/'+postId+'/like', {
                    like: likeInfos})
                .then(() => {
                    this.$emit('eventLiked')
                })
                .catch(error => console.log(error))
                return
            
            }else if(like == 1 && listOfuserIdDisliked.includes(likeInfos.userId.toString())){
                return
            }else if(like == -1 && listOfuserIdLiked.includes(likeInfos.userId.toString())) {
                return
            }
            else if(like == 1){
                likeInfos.like = 1

                await instance.post('post/'+postId+'/like', {
                    like: likeInfos})
                .then(() => {
                    this.$emit('eventLiked')
                })
                .catch(error => console.log(error))
                return
            }
            else if(like == -1) {
                likeInfos.like = -1

                await instance.post('post/'+postId+'/like', {
                    like: likeInfos})
                .then(() => {
                    this.$emit('eventLiked')
                })
                .catch(error => console.log(error))
                return
            }
        }
    }
}
</script>

<style lang="scss">
@import '../sass/_variables';

.like-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.like{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span{
        margin-top:5px;
    } 
    &__more:hover{
        color: green;
    }
    &--liked{
        color: green;
    }
    &--disliked{
        color: red;
    }
    &__less:hover{
        color: red;
    }
    &--disabled{
        color: $color-disabled;
        cursor: not-allowed;
        &:hover{
            transition:none;
            color: $color-disabled;
            transform:none;
            box-shadow: none;
        }
    }
}
</style>
