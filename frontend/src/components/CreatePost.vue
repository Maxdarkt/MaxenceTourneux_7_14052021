<template>
    <div class="new-Post">
        <div class="form-row">
            <p>{{user.username}} :</p>
        </div>
        <div class="form-row">
            <input v-model="title" type="text" class="form-row__input" name ="title" id="title" placeholder="Titre du Post" required/>
        </div>
        <div class="from-row">
            <textarea  v-model="description" class="form-row__textarea" name ="description" id="description" placeholder="Description" cols="40" rows="8" required></textarea>
        </div>
        <div class="from-row">
            <div v-if="!image">
                <input type="file" @change="onFileChange" class="form-row__input" name="image" id="image" accept="image/png, image/jpeg, image/jpg" required>
            </div>
            <div v-else>
                <img :src="image">
                <button @click="removeImage">Remove image</button>
            </div>
        </div>
        <div class="form-row">
            <button class="button" :class="{ 'button--disabled' : !validatedFieldsPosts}" @click="post()">Publier</button>
            <button @click="test" class="button">test</button>
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
            imageUrl: '',

        }
    },
    computed: {
                validatedFieldsPosts: function() {
                if (this.title != "" && this.description != "" && this.imageUrl != "") {
                    return true;
                } else {
                    return false;
                }
        },
        ...mapState(['user'])
    },
    mounted () {      
        
    },
    methods: {
        post: function() {

            console.log(this.title +' - '+ this.description +' - '+ this.imageUrl)

        },
        test: function() {
            console.log(this.image)
        },
        onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
        },
        createImage(file) {
                this.filename(file.name)
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                vm.image = e.target.result;
                }

                reader.readAsDataURL(file)
                
                
        },
        filename: function (imageUrl) {
            this.imageUrl = imageUrl
        },
        removeImage: function () {
        this.image = '';
        }

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

// .form-row{
//     margin : 20px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     label{
//         display: flex;
//         justify-content: flex-start;
//     }
//     input{

//     }
// }

</style>