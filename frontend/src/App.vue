<template>
<div class="nav">
  <div class="nav__logo">
    <p><img alt="Logo" src="../src/assets/logo.png"/></p>
  </div>
  <div class="nav__items">
    <router-link to="/">Home</router-link> |
    <router-link to="/profil">Profile</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
</div>
<router-view />

</template>

<script>
//import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    //Footer
  },
}

</script>


<style lang="scss">
@import '/sass/_variables';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
html, body{
  padding: 0px;
  margin: 0px;
}
.nav {
  position: fixed;
  width:100%;
  top:0;
  padding: 0px;
  height:80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  z-index: 1000;
 
  &__logo{
    width:20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img{
      height: 80px;
    }
  }
  &__items{
    width: 35%;
    display:flex;
    justify-content: space-around;
  }
  a {
    font-weight: bold;
    color: $color-first;

    &.router-link-active {
      color: $color-second;

    }
  }
}
</style>