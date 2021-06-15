<template>
    <div class="ct-create">

        <div class="overlay"></div>

        <div class="ct-create__card">
            <h2>Créer une publication</h2>
            <div class="form-row">
                <p>{{user.username}} :</p>
                <i class="far fa-times-circle fa-2x" @click="sendDisplayPost"></i>
            </div>
            <div class="form-row">
                <input v-model="title" type="text" class="form-row__input" name ="title" id="title" placeholder="Titre du Post" required/>
            </div>
            <div class="from-row">
                <textarea  v-model="description" class="form-row__textarea" name ="description" id="description" placeholder="Description" required></textarea>
            </div>
            <div class="from-row">
                <div class="preview" v-if="!image">
                    <input type="file" @change="onFileChange" class="form-row__input" name="image" id="image" accept="image/png, image/jpeg, image/jpg" required>
                </div>
                <div class="preview" v-else>
                    <img :src="image">
                    <button class="center" @click="removeImage">Supprimer l'image</button>
                </div>
            </div>
            <div class="form-row">
                <button class="button button--blue" :class="{ 'button--disabled' : !validatedFieldsPosts}" @click="onSubmit">Publier</button>
            </div>      
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
            if (this.title == "" || this.description == "" || this.FILE == "") {
                return
            }
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
        sendDisplayPost() {
            this.$emit('eventDisplayPost')
        }
    }
}    
</script>


<style lang="scss" scoped>
@import '../sass/_variables';
.center{
display: flex;
justify-content: center;
align-items: center;
}
.ct-create{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .overlay{
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    }
    &__card{
        background-color: $color-bg-secondary;
        color: #333;
        padding: 10px;
        position: fixed;
        top: 100px;
        border-radius: 20px;
        width: 80%;
        min-height: 550px;
        h2{
            margin-bottom : 0;
        }
        p:first-child{
            margin-top: 0;
        }
        i{
            cursor: pointer;
            width: 30px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        input, textarea {
            border: 2px solid #BAD5EA;
        }
        img {
        width: 80%;
        height: auto;
        margin: auto;
        display: block;
        margin-bottom: 20px;
        }
    }
}
.preview{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 400px;
}

</style>