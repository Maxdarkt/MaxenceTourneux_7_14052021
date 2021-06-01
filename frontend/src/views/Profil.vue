<template>
<div class="container-card">
    <div class="card">
      <h1 class="card__title">Mon compte</h1>
      <p class="card__subtitle">Mes informations personnelles :</p>
      <div class="form-row column--2">
        <div class="form-row__img">
          <i class="fas fa-user-circle fa-5x"></i>
        </div>
        <div class="form-row__infos">
          <p>Pseudo : {{ user.username }}</p>
          <p>E-mail : {{ user.email }}</p>
          <p v-if="user.admin == false">Niveau : utilisateur </p>
          <p v-else>Niveau : Administrateur </p>
        </div>
      </div>
      
      <div class="form-row">
        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <div class="form-row">
        <button @click="deleteAccount()" class="button delete">Supprimer mon compte</button>
      </div>
    </div>
</div>


</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'

// console.log(store.state.user.id)

export default {
  name: 'Profil',
  // mounted: {
  //   function() {
  //     if(this.$store.state.user.id == -1){
  //       this.$router.push('/login')
  //       return
  //     }
  //   }

  // },
  computed: {
    ...mapState(['user'])
  },
  methods: {
        logout: function() {
            const self = this;
            this.$store.dispatch('logout')
            .then(function(){
                self.$router.push('/login')
            })
            .catch(function(error) {
                console.log(error)
            })
        },
        deleteAccount: function () {
            const self = this;
            this.$store.dispatch('delete', store.state.user)
            .then(function(){
                self.$router.push('/login')
            })
            .catch(function(error) {
                console.log(error)
            })
        }

  }
}

</script>

<style lang="scss" scoped>
.card{
  height:400px;
}
.column--2{
  display: flex;
  justify-content: space-around;
  align-items: center;
  &__img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
  }
  &__infos{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 64%;
  }
  p{
    width: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: flex-start;
  }
  i{

    height:100%;
    border: 1px solid grey;
  }
}
.delete{
  background-color: rgb(219, 82, 82);
}
</style>