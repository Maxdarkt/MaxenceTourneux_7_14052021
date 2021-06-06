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
        <GetAllsPots :key="newPostCreated"/>
      </div>
</div>

</template>

<script>

import CreatePost from '../components/CreatePost'
import GetAllsPots from '../components/GetAllPosts.vue'

import { mapState } from 'vuex'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
  name: 'Home',
  components: {
    CreatePost,
    GetAllsPots
  },
  data() {
  
    return {
    displayPost: 0,
    newPostCreated: 0,
    post: ''
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
      if(this.displayPost == 0) {
        this.displayPost = 1

      } else {
        this.displayPost = 0
      }
    },
    newPost: function (){
      this.newPostCreated ++
      this.displayPost = 0
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
      background-color: #54aaec;
      &:hover{
        transform: scale(1.01);
        background-color:#2884ca;
        box-shadow: 0px 12px 7px #7a8085;
      } 
  }
  &--2{
    width: 50%;
    background-color: #ee5c5c; 
    &:hover{
      transform: scale(1.01);
      background-color:#f16d6d;
      box-shadow: 0px 12px 7px #7a8085;
    }
  }
}
</style>