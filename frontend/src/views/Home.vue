<template>
<div class="home">

  <h1>Posts</h1>
  <div class="post" v-for="post in posts" :key="post">
    <div class="post__head">
      <p>Username</p>
      <p>time</p>
    </div>
    <div class="post__title">
      <p>{{post.title}}</p>
    </div>
    <div class="post__view" :style="{ 'background-image': 'url(' + post.imageUrl + ')'}">
    </div>
    <div class="post__description">
      <p>{{post.description}}</p>
    </div>
    <div class="post__foot">
      <p class="like"><i class="far fa-thumbs-up fa-2x"></i><span>{{post.userIdLiked}}</span></p>
      <p class="like"><i class="far fa-thumbs-down fa-2x"></i><span>{{post.userIdDisliked}}</span></p>
      <p class="comments"><i @click="displayComments(post.id)" class="far fa-comment-alt fa-2x"></i><span>5 comments</span></p>
    </div>
    <Comments v-if="loading == false" :postId="post.id" :displayCom="displayCom"/>
    
    
  </div>
</div>

</template>

<script>
import Comments from '../components/Comments'

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
      loading: true
    }
  },
  created () {
    instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;
  },
  mounted () {
      this.loading = true;

      instance.get('post/')
      .then(response => { 
        this.posts = response.data.data
        for(let item of response.data.data) {
          this.displayCom[item.id] = ({"id" : item.id, "check" : 0})
        }
        console.log(this.displayCom)
        })
      .catch(error => { error })
      .finally(() => {
        this.loading = false
      });
      
  },
  methods: {
    displayComments: function(postId){
      for (let item of this.displayCom) {
        console.log(item.id +' - ' +postId)
        if(this.displayCom[item.id].id == postId && this.displayCom[item.id].check == 0){
          return this.displayCom[item.id] = ({"id" : postId, "check" : 1})
        } else if (this.displayCom[item.id].id == postId && this.displayCom[item.id].check == 1){
          return this.displayCom[item.id] = ({"id" : postId, "check" : 0})
        }
      }

    }
  }
}  

</script>

<style lang="scss" scoped>
@import '../sass/_variables';

.home{
  width: 100%;
  margin-top:150px;
}
.post{
  //background-color: rgb(209, 204, 204);
  padding: 10px;
  border: 1px solid black;
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
    background-position: center;
    background-size: cover;
  }
  &__description{
    display: flex;
    justify-content: flex-start;
    text-align: justify;
  }
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