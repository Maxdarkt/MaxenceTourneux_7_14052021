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
@import './sass/main';

html, body{
  margin: 0;
  padding: 0;
}

html {
    font-family: 'Noto Sans JP', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    color: black;
}

.nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  z-index: 1000;
  @include mobile-only{
    position: inherit;
  }
}

</style>