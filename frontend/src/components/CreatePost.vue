<template>
    <div class="new-Post">
        <div class="form-row">
            <p>{{user.username}} :</p>
        </div>
        <div class="form-row">
            <input v-model="title" type="text" class="form-row__input" name ="title" id="title" placeholder="Titre du Post" required/>
        </div>
        <div class="from-row">
            <textarea  v-model="description" class="form-row__textarea" name ="description" id="description" placeholder="Description" cols="30" rows="8" required></textarea>
        </div>
        <div class="from-row">
            <div v-if="!image">
                <input type="file" @change="onFileChange" class="form-row__input" name="image" id="image" accept="image/png, image/jpeg, image/jpg" required>
            </div>
            <div v-else>
                <img :src="image">
                <button @click="removeImage">Supprimer l'image</button>
            </div>
        </div>
        <div class="form-row">
            <button class="button button--blue" :class="{ 'button--disabled' : !validatedFieldsPosts}" @click="onSubmit">Publier</button>
        </div>      
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import router from '../router/index'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {

    name : 'CreatePost',
    props: {

    },
    data() {
        return {
            loading: true,
            title: '',
            description: '',
            image: '',
            FILE: '',
        }
    },
    computed: {
                validatedFieldsPosts: function() {
                if (this.title != "" && this.description != "" && this.FILE != "") {
                    return true;
                } else {
                    return false;
                }
        },
        ...mapState(['user'])
    },
    created () {
    instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;

    },
    methods: {
        onFileChange (e) {
            this.FILE = e.target.files[0]
            var files = e.target.files|| e.dataTransfer.files //On récupère le fichier pour créer un aperçu
                if (!files.length)
                return;
                this.createImage(files[0]); // appel de la fonction pour créer l'aperçu
        },
        async onSubmit() {
            const body = new FormData()
            body.append('image', this.FILE, this.FILE.name)
            body.append('userId', this.$store.state.user.id)
            body.append('username', this.$store.state.user.username)
            body.append('title', this.title)
            body.append('description', this.description)

            await instance.post('post/', body)
            .then(() => { 
                    this.$emit('eventPost')
            })
            .catch(error => console.log(error))
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
            vm.image = e.target.result;
            }

            reader.readAsDataURL(file)
        
        },
        removeImage: function () {
        this.image = '';
        },
    }
}    
</script>


<style lang="scss" scoped>
@import '../sass/_variables';

.new-Post{
    width: 60%;
    margin: 20px;
    padding: 20px;
    border: 2px solid #BAD5EA;
    margin-left: auto;
    margin-right: auto;
    border-radius : 10px;
    input, textarea {
        border: 2px solid #BAD5EA;
    }
    img {
    width: 95%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
    }
}


</style>