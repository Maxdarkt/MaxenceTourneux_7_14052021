<template>
<div class="home">

      <h1>Posts</h1>
      <p>{{this.$store.state.user.token}}</p>

</div>

</template>

<script>
const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})



export default {
  name: 'Home',
  created () {
    //console.log(this.$store.state.user.token)
    instance.defaults.headers.common['Authorization'] = this.$store.state.user.token;
    instance.get('post')
    .then(response => response)
    .catch(error => { error });
  },
}  

</script>

<style lang="scss">
@import '../sass/_variables';

.home{
  width: 100%;
  margin-top:150px;
}

</style>