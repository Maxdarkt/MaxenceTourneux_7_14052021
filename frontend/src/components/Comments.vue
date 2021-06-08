<template>
    <div class="post__comments">
        <div class="post__comments__old" v-for="comment in comments[postId]" :key="comment.id">
            <table>
                <tr>
                    <td class="col-1">
                        {{comment.username}} a écrit :<br/>  [{{comment.created}}] :
                    </td>
                    <td class="col-2">
                        {{ comment.message}}
                        </td>
                    <td class="col-3">
                        <button class="button button--red button--comment"><i class="fas fa-ban"></i></button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="post__comments__new">
            <table>
                <tr>
                    <td class="col-1">
                        {{user.username}} :
                    </td>
                    <td class="col-2">
                        <textarea type="text" name="message" v-model="message" placeholder="Nouveau Commentaire" cols="60" rows="4"></textarea>
                    </td>
                    <td class="col-3">
                        <button class="button button--blue button--comment" :class="{ 'button--disabled' : !validatedFieldsComments}" @click="onSubmitComment(postId)"><i class="fas fa-paper-plane"></i></button>
                    </td>
                </tr>
            </table>  
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
    name : 'Comments',
    data() {
        return {
            message: '',
        }
    },
    props: {
        postId : Number,
        comments: Array
    },
    computed:{
        validatedFieldsComments: function() {
            if (this.message != "") {
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
    methods:{
        onSubmitComment: function (postId) {
            console.log('le commentaire correpon au post N° '+postId)
            console.log(this.message)

            const body = {
            userId: this.$store.state.user.id,
            username: this.$store.state.user.username,
            postId: postId,
            message: this.message,
            usersLikedComment: '0',
            usersDislikedComment: '0',
            userIdLikedComment: '0',
            userIdDislikedComment: '0',

            }
            console.log(body)

            instance.post('post/'+postId+'/comment', {
                comment: body})
            .then((response) => {
                //this.$emit('eventModified')
                console.log(response)
            })
            .catch(error => console.log(error))


        }
    }
}
</script>

<style lang="scss" scoped>
@import '../sass/_variables';
// .post__comments{

// }

.col-1{
    width:19%;
}
.col-2{
    width:60%;
}
.col-3{
    width:10%;
}

.button--comment{
    height: 40px;
    width: 60px;
}



</style>