<template>
    
    <div class="ct-modify">

        <div class="overlay"></div>

        <div class="ct-modify__card">
            <div class="ct-modify__card__head">
                <h2>Modifier le Post</h2>
                <i class="far fa-times-circle fa-2x" @click="closeModifyPost"></i>
            </div>

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
                <div class="preview" v-else>
                    <img :src="image">
                    <button @click="removeImage">Supprimer l'image</button>
                </div>
            </div>
            <div class="form-row">
                <button class="button button--blue" :class="{ 'button--disabled' : !validatedFieldsPosts }" @click="onModify(postId)">Modifier</button>
            </div>  
        </div>
    </div>


</template>


<script>
import { mapState } from 'vuex'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {
    name: 'ModifyPost',
    data() {
        return {
            loading: true,
            title: '',
            description: '',
            image: '',
            FILE: '',
        }
    },
    props:{
        postId: Number
        
    },
    computed: {
                validatedFieldsPosts: function() {
                if (this.title != "" && this.description != "") {
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
        closeModifyPost: function() {
            this.$emit('eventClose')

        },
        onFileChange (e) {
            var files = e.target.files|| e.dataTransfer.files //On récupère le fichier pour créer un aperçu
            this.FILE = files[0]
                if (!files.length)
                return;
                this.createImage(files[0]); // appel de la fonction pour créer l'aperçu
        },
        async onModify(postId) {
            
            if(this.FILE){//Si image = formData
                const body = new FormData()
                body.append('image', this.FILE, this.FILE.name)
                body.append('userId', this.$store.state.user.id)
                body.append('username', this.$store.state.user.username)
                body.append('title', this.title)
                body.append('description', this.description)

                await instance.put('post/'+postId, body)
                .then(() => {
                    this.$emit('eventModified')
                })
                .catch(error => console.log(error))

            } else {//Sinon JSON
                const body = {
                userId: this.$store.state.user.id,
                username: this.$store.state.user.username,
                title: this.title,
                description: this.description
                }

                await instance.put('post/'+postId, {
                    post: body})
                .then(() => {
                    this.$emit('eventModified')
                })
                .catch(error => console.log(error))

            }
        this.FILE = ''    
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
        this.FILE = '';
        this.image = ''
        },
    }
}

</script>


<style lang="scss" scoped>
@import '../sass/_variables';

.ct-modify{
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
        width: 60%;
        min-height: 500px;
        &__head{
        display: flex;
        justify-content: space-between;
        align-items: center;
            i{
                cursor: pointer;
                width: 30px;
                position: absolute;
                top: 10px;
                right: 10px;
            }
        }
        .preview{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 50px;
            max-height: 300px;
        }
        img{
            height:250px;
        }
    }
}


</style>