<template>
      <div class="nav__logo">
    <p><img alt="Logo" src="../../src/assets/logo.png"/></p>
  </div>
</template>

<style lang="scss">
@import '/src/sass/_variables';
@import '/src/sass/_mixins';

.nav__logo{
    display: flex;
    align-items: center;
    justify-content: space-around;
    img{
      height: 40px;
      margin: 10px 0px 10px 10px;
    }
}    
</style>