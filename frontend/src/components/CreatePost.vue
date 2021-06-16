<template>
    <div class="ct-post">

        <div class="overlay"></div>

        <div class="ct-post__card">
            <div class="ct-post__card__head">
                <h2>Créer une publication</h2>
                <i class="far fa-times-circle fa-2x" @click="sendDisplayPost"></i>
            </div>
            <div class="ct-post__card__username">
                <p>{{user.username}} :</p>
            </div>
            <div class="ct-post__card__form">
                <input v-model="title" type="text" class="form-row__input" name ="title" id="title" placeholder="Titre du Post" required/>
                <textarea  v-model="description" class="form-row__textarea" name ="description" id="description" placeholder="Description" required></textarea>
            </div>
            <div class="ct-post__card__preview">
                <div class="preview" v-if="!image">
                    <input type="file" @change="onFileChange" class="form-row__input" name="image" id="image" accept="image/png, image/jpeg, image/jpg" required>
                </div>
                <div class="ct-post__card__preview__img" v-else>
                    <img :src="image">
                    <button class="center" @click="removeImage">Supprimer l'image</button>
                </div>
            </div>
            <div class="ct-post__card__action">
                <button class="button button--blue" :class="{ 'button--disabled' : !validatedFieldsPosts}" @click="onSubmit">Publier</button>
            </div>      
        </div>
    </div>
    

</template>

<script>
import { mapState } from 'vuex'

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
        ...mapState(['user']),
        ...mapState(['url'])
    },
    created () {
    this.url.instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;
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

            await this.url.instance.post('post/', body)
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


<style lang="scss">


</style>