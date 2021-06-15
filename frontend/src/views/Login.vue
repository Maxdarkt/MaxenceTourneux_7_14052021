<template>
    <div class="container-card">
        <div class="card">
            <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
            <h1 class="card__title" v-else>Inscription</h1>
            <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
            <p class="card__subtitle" v-else-if="mode == 'create'">Tu a déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
            <div class="form-row">
                <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
            </div>
            <div class="form-row" v-if="mode == 'create'">
                <input v-model="username" class="form-row__input" type="text" placeholder="Pseudo"/>
            </div>
            <div class="form-row">
                <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe">
            </div>
            <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail et/ou mot de passe invalide
            </div>
            <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
                Adresse mail déjà utilisée
            </div>
            <div class="form-row">
                <button class="button button--blue" @click="login()" :class="{ 'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                   <span v-if="status == 'loading'">Connexion en cours ...</span> 
                   <span v-else>Connexion</span> 
                </button>
                <button class="button button--blue" @click="createAccount()" :class="{ 'button--disabled' : !validatedFields}" v-else>
                    <span v-if="status == 'loading'">Création en cours ...</span> 
                    <span v-else>Créer mon compte</span> 
                </button>  
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Login',
    data: function(){
        return {
            mode: 'login',
            email: '',
            username: '',
            password: '',
        }
    },
    computed: {
        validatedFields: function() {
            if (this.mode == 'create') {
                if (this.email != "" && this.username != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState([ 'status', 'user' ])
    },
    created(){
        document.getElementById('app').style.width="100%"
    },
    methods: {
        switchToCreateAccount: function() {
            this.mode = 'create';
        },
        switchToLogin: function() {
            this.mode = 'login';
        },
        login: function() {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            })
            .then(function(){
                self.$router.push('/')
            })
            .catch(function(error) {
                console.log(error)
            })
        },
        createAccount: function() {
            const self = this;
            this.$store.dispatch('createAccount', {
                email: this.email,
                username: this.username,
                password: this.password,
                admin: false
            })
            .then(function(){
                self.login()
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
}

</script>

<style lang="scss">
@import '../sass/main';

.container-card{
    background-color: $color-bg-primary;
    min-height: 81.5vh;
    width: 100%;
    margin-top: 80px;
    padding-top: 100px;
    display: flex;
    justify-content: center;
}
.card{
    width: 400px;
    height: 350px;
    background-color: $color-bg-secondary;
    border-radius: 10px;
    padding:15px;
    &__action{
        color: $color-bg-primary;
        text-decoration-line: underline;
        cursor: pointer;
    }
}


</style>
