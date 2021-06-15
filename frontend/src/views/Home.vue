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
    <ModifyPost @eventClose="closePost" @eventModified="newModifiedPost" :postId="modifyPostId" :post="post"/>
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

    // document.getElementById('app').style.width="980px"

  },
  computed: {
      responsive(){
        if(document.body.clientWidth < 980 ){
          return console.log('<980 : ', document.body.clientWidth)
          // return document.getElementById('app').style.width="100%"
        }
        else{
          return console.log('else : ', document.body.clientWidth)
          // return document.getElementById('app').style.width="980px"
        }
      },

    ...mapState(['user']),
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
@import '../sass/main';

.home{
  max-width: 980px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top:100px;
}

</style>