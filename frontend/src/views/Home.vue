<template>
<div class="home">

  <div class="create-post">
      <button class="button button--blue button--fixed">
        <i class="fas fa-plus fa-2x" @click="displayNewPost"></i>
      </button>
    <div v-if="displayPost == 1"> 
      <CreatePost @eventPost="newPost" @eventDisplayPost="displayNewPost" />
    </div>
  </div>
  <div> 
    <GetAllsPosts :key="refreshPosts" @eventModify="newModifyPost" @eventDelete="newDeletePost" />
  </div>
  <div v-if="openOrCloseModifyPost == 1">
    <ModifyPost @eventClose="closePost" @eventModified="newModifiedPost" :postId="modifyPostId" />
  </div>
</div>

</template>

<script>

import CreatePost from '../components/CreatePost'
import GetAllsPosts from '../components/GetAllPosts.vue'
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
    GetAllsPosts,
    ModifyPost
  },
  data() {
  
    return {
    displayPost: 0,
    refreshPosts: 0,
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
      if(this.displayPost == 0) {
        this.displayPost = 1

      } else {
        this.displayPost = 0
      }
    },
    newPost: function (){
      this.refreshPosts ++
      this.displayPost = 0
    },
    newModifyPost: function (payload) {
      this.modifyPostId = payload.modifyPostId
      if(this.openOrCloseModifyPost == 0){
        this.openOrCloseModifyPost = 1
      } else {
        this.openOrCloseModifyPost = 0
      }
    },
    closePost: function() {
      this.openOrCloseModifyPost = 0
    },
    newModifiedPost: function() {
      this.refreshPosts ++
      this.openOrCloseModifyPost = 0
    },
    newDeletePost: function() {
      this.refreshPosts ++
    }
  }
}  

</script>

<style lang="scss">
@import '../sass/_variables';

.home{
  width: 100%;
  margin-top:100px;
}

.button{
  &--fixed{
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius:25px;
  }
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