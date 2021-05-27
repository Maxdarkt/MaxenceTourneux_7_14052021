<template>
  <div class="nav">
    <div class="nav__logo">
      <p><img alt="Logo" src="../src/assets/Logo.png"/></p>
    </div>
    <div class="nav__items">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/mentions-legales">Mentions Légales</router-link>
    </div>
  </div>

  <router-view/>
  <Footer/>
</template>

<script>
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
    logo: '../src/assets/logo.jpg'
    }
  }
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
  height:150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  transition: 400ms;
  //box-shadow: 0px 10px 20px grey;
  
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
    width: 25%;
    display:flex;
    justify-content: space-around;
  }
  a {
    font-weight: bold;
    color: $color-first;

    &.router-link-exact-active {
      color: $color-second;
    }
  }
}
</style>