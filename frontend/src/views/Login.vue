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
                <button class="button" @click="login()" :class="{ 'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                   <span v-if="status == 'loading'">Connexion en cours ...</span> 
                   <span v-else>Connexion</span> 
                </button>
                <button class="button" @click="createAccount()" :class="{ 'button--disabled' : !validatedFields}" v-else>
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

.container-card{
    background-color:#0E6DB6;
    min-height:100vh;
    width: 100%;
    margin-top: 80px;
    padding-top:100px;
    display: flex;
    justify-content: center;
}
.card{
    width:400px;
    height: 350px;
    background-color: #BAD5EA;
    border-radius: 10px;
    padding:15px;
    &__action{
        color: #0E6DB6;
        text-decoration-line: underline;
        cursor: pointer;
    }
}

.form-row {
display: flex;
margin: 16px 0px;
gap:16px;
flex-wrap: wrap;
    &__input, &__textarea {
    width: 100%;  
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    }
    &::placeholder {
        color:#aaaaaa;
    }
}

.button{
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    height: 50px;
    width: 100%;
    background-color: #0E6DB6;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition : all 400ms;
    &:hover{
        transform: scale(1.01);
        background-color:#2884ca;
        box-shadow: 0px 12px 7px #7a8085;
    }
    &--disabled{
        background-color: rgb(148, 143, 143);
        cursor: not-allowed;
        &:hover{
        transition:none;
        background-color: rgb(148, 143, 143);
        transform:none;
        box-shadow: none;
        }
    }
}


</style>
