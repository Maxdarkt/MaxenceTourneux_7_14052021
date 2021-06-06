<template>

<div class="nav">
  <HeaderLogo/>
  <HeaderNav/>
</div>

<router-view/>

</template>

<script>
import HeaderLogo from './components/Header_logo.vue'
import HeaderNav from './components/Header_nav.vue'


export default {
  name: 'App',
  components: {
    HeaderLogo,
    HeaderNav
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
  height:80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  z-index: 1000;
}

.button{
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    height: 50px;
    width: 100%;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition : all 400ms;
    &--blue{
        background-color: $color-blue;
        &:hover{
            transform: scale(1.01);
            background-color: lighten($color-blue, 4%);
            box-shadow: 0px 12px 7px $color-shadow-1;
        }
    }
    &--green{
      background-color: $color-green;
      &:hover{
          transform: scale(1.01);
          background-color: lighten($color-green, 4%);
          box-shadow: 0px 12px 7px $color-shadow-1;
      }
    }
    &--red{
      background-color: $color-red;
      &:hover{
          transform: scale(1.01);
          background-color: lighten($color-red, 4%);
          box-shadow: 0px 12px 7px $color-shadow-1;
      }
    }
    &--disabled{
        background-color: $color-disabled;
        cursor: not-allowed;
            &:hover{
            transition:none;
            background-color: $color-disabled;
            transform:none;
            box-shadow: none;
            }
    }
}
</style>