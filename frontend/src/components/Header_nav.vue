<template>
    <div class="nav__items">
        <router-link to="/">Home</router-link> |
        <span v-if="chekUser()">
        <router-link to="/profil">Profile</router-link>
        </span>
        <span v-else>
        <router-link to="/login">Login</router-link>
        </span>

    </div>
</template>

<script>
import store from '../store/index'

export default {
    methods: {
        chekUser: function () {
            if (store.state.user.id != -1) {
                return true
            }
        }
    },
}
</script>

<style lang="scss">
@import '/src/sass/_variables';
@import '/src/sass/_mixins';

.nav__items{
    width: 150px;
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
</style>