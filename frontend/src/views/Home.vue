<template>
<div class="home">

  <h1>Posts</h1>
  <div class="create-post">
    <div class="create-post__user">
      <button class="button button--1 new-post" @click="displayNewPost()" v-if="displayPost == 0">Publier un post</button>
      <button class="button button--2 new-post" @click="displayNewPost()" v-if="displayPost == 1">Annuler la création de post</button>
    </div>
    <div v-if="displayPost == 1"> 
      <CreatePost @eventPost="newPost"/>
    </div>
  </div>
  <div> 
    <GetAllsPots :key="newPostCreated" @eventModify="newModifyPost"/>
  </div>
  <div v-if="openOrCloseModifyPost == 1">
    <ModifyPost @eventClose="closePost"/>
  </div>
</div>

</template>

<script>

import CreatePost from '../components/CreatePost'
import GetAllsPots from '../components/GetAllPosts.vue'
import ModifyPost from '../components/ModifyPost.vue'

import { mapState } from 'vuex'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
  name: 'Home',
  components: {
    CreatePost,
    GetAllsPots,
    ModifyPost
  },
  data() {
  
    return {
    displayPost: 0,
    newPostCreated: 0,
    post: '',
    modifyPostId: '',
    openOrCloseModifyPost: 0
    
    }
  },
  created () {
    instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;

  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    displayNewPost: function(){
      console.log('before :'+ this.displayPost)
      if(this.displayPost == 0) {
        this.displayPost = 1

      } else {
        this.displayPost = 0
      }
      console.log('after :'+ this.displayPost)
    },
    newPost: function (){
      this.newPostCreated ++
      this.displayPost = 0
    },
    newModifyPost: function (payload) {
      this.modifyPostId = payload.modifyPostId
      if(this.openOrCloseModifyPost == 0){
        this.openOrCloseModifyPost = 1
      } else {
        this.openOrCloseModifyPost = 0
      }
      console.log('openOrCloseModifyPost: '+ this.openOrCloseModifyPost)
    },
    closePost: function() {
      this.openOrCloseModifyPost = 0
    }
  }
}  

</script>

<style lang="scss">
@import '../sass/_variables';

.home{
  width: 100%;
  margin-top:150px;
}

.button{
  &--1{
      width: 50%;
      background-color: $color-blue;
      &:hover{
        transform: scale(1.01);
        background-color: brightness($color-blue, 10%);
        box-shadow: 0px 12px 7px $color-shadow-1;
      } 
  }
  &--2{
    width: 50%;
    background-color: $color-red; 
    &:hover{
      transform: scale(1.01);
      background-color: brightness($color-red, 10%);
      box-shadow: 0px 12px 7px $color-shadow-1;
    }
  }
}
</style>