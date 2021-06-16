<template>
    
    <div class="ct-post">

        <div class="overlay"></div>

        <div class="ct-post__card">
            <div class="ct-post__card__head">
                <h2>Modifier le Post</h2>
                <i class="far fa-times-circle fa-2x" @click="closeModifyPost"></i>
            </div>

            <div class="ct-post__card__username">
                <p>{{user.username}} :</p>
            </div>
            <div class="ct-post__card__form">
                <input v-model="title" type="text" class="form-row__input" name ="title" id="title" placeholder="Titre du Post" required/>
                <textarea  v-model="description" class="form-row__textarea" name ="description" id="description" placeholder="Description" required></textarea>
            </div>
            <div class="ct-post__card__preview">
                <div v-if="!image">
                    <input type="file" @change="onFileChange" class="form-row__input" name="image" id="image" accept="image/png, image/jpeg, image/jpg" required>
                </div>
                <div class="ct-post__card__preview__img" v-else>
                    <img :src="image">
                    <button @click="removeImage">Supprimer l'image</button>
                </div>
            </div>
            <div class="ct-post__card__action">
                <button class="button button--blue" :class="{ 'button--disabled' : !validatedFieldsPosts }" @click="onModify(postId)">Modifier</button>
            </div>  
        </div>
    </div>


</template>


<script>
import { mapState } from 'vuex'

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
        ...mapState(['user']),
        ...mapState(['url'])
    },
    created () {
    this.url.instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;
    console.log(this.post)

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
            if (this.title == "" || this.description == "") {
                return
            }

            if(this.FILE){//Si image = formData
                const body = new FormData()
                body.append('image', this.FILE, this.FILE.name)
                body.append('userId', this.$store.state.user.id)
                body.append('username', this.$store.state.user.username)
                body.append('title', this.title)
                body.append('description', this.description)

                await this.url.instance.put('post/'+postId, body)
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

                await this.url.instance.put('post/'+postId, {
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


<style lang="scss">
@import '../sass/main';

.ct-post{
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
        h2{
            margin-bottom : 0;
        }
        p:first-child{
            margin-top: 0;
        }
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
        &__form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            input{
                margin-bottom: 20px;
            }
            textarea{
                height: 50px;
                margin-bottom: 20px;
            }
        }
        &__preview{
            width:100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            &__img{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                width: 80%;
                margin: 10px;
                }
            }
        }
    }
}
  


</style>