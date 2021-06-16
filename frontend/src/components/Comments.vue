<template>
    <div class="post__comments">
        <div class="post__comments__old" v-for="comment in comments[postId]" :key="comment.id">
            <table>
                <tr>
                    <td class="col-1">
                        {{comment.username}} a écrit :<br/>
                        <div class="time" v-if="timeComments(comment.created, comment.id)">
                            <p v-if="timeComs[comment.id].year == 1">Il y a {{timeComs[comment.id].year}} an</p>
                            <p v-else-if="timeComs[comment.id].year > 1">Il y a {{timeComs[comment.id].year}} ans</p>
                            <p v-else-if="timeComs[comment.id].day == 1">Il y a {{timeComs[comment.id].day}} jour</p>
                            <p v-else-if="timeComs[comment.id].day > 1">Il y a {{timeComs[comment.id].day}} jours</p>
                            <p v-else-if="timeComs[comment.id].min == 1">Il y a {{timeComs[comment.id].min}} minute</p>
                            <p v-else-if="timeComs[comment.id].min > 1">Il y a {{timeComs[comment.id].min}} minutes</p>
                        </div>
                    </td>
                    <td class="col-2">
                        {{ comment.message}}
                    </td>
                    <td class="col-3">
                        <button v-if="comment.userId == user.id || user.admin == true" class="button button--red button--comment" @click="deleteComment(comment.id, comment.postId)" ><i class="fas fa-ban"></i></button>
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
                        <textarea type="text" name="message" v-model="message" placeholder="Nouveau Commentaire"></textarea>
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

export default {
    name : 'Comments',
    data() {
        return {
            message: '',
            timeComs: [],
        }
    },
    props: {
        postId : Number,
        comments: Array,
        numberOfComments: Array
    },
    computed:{
        validatedFieldsComments: function() {
            if (this.message != "") {
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
    methods:{
        onSubmitComment(postId) {
            if(!this.message){
                return
            }

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

            this.url.instance.post('post/'+postId+'/comment', {
                comment: body})
            .then(() => {
                this.$emit('eventRefreshCom')
                this.refreshNumberOfComments(postId, 1)
            })
            .catch(error => console.log(error))


        },
        deleteComment(commentId, postId) {
            if(confirm('Confirmez-vous la suppression de ce commentaire ?')){
                this.url.instance.delete('post/'+commentId+'/comment')
                .then(() => {
                    this.$emit('eventRefreshCom')
                    this.refreshNumberOfComments(postId, -1)
                })
                .catch(error => console.log(error))
            } else {
                return
            }
        },
        async refreshNumberOfComments(postId, value){

            if(value == 1){
                await this.url.instance.put('post/nbComment/' + postId, {
                    count: value
                })
                .then((res) => {
                    this.$emit('eventRereshNbCom', {
                        postId: postId,
                        number: res.data.data
                    })
                })
                .catch(error => console.log(error))

            } else if(value == -1) {
                await this.url.instance.put('post/nbComment/' + postId, {
                    count: value
                })
                .then((res) => {
                    this.$emit('eventRereshNbCom', {
                        postId: postId,
                        number: res.data.data
                    })
                })
                .catch(error => console.log(error))
            }

        },
        timeComments: function (dateCreated, commentId) {

            let dateMysql = Date.parse(dateCreated)
            let dateNow = Date.now()

            var diff = {}                           // Initialisation du retour
            var tmp = dateNow - dateMysql;
        
            tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
            diff.sec = tmp % 60;                    // Extraction du nombre de secondes
        
            tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
            diff.min = tmp % 60;                    // Extraction du nombre de minutes
        
            tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
            diff.hour = tmp % 24;                   // Extraction du nombre d'heures
            
            tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
            diff.day = tmp;

            tmp = Math.floor((tmp-diff.day)/365);   // Nombre de jours restants
            diff.year = tmp;

            this.timeComs[commentId] = diff

            return this.timeComs
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../sass/_variables';
.post__comments{
    background-color: #e2e2e2;
    border-radius: 0px 0px 15px 15px;
    padding: 10px;
    margin : 10px -10px -10px -10px;
}
table{
    text-align: left;
    width: 100%;
}
.col-1{
    width:19%;
}
.col-2{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    textarea{
        width: 90%;
        height:60px;
        border: none;
        border-radius: 10px;
        padding:8px;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Noto Sans JP', Helvetica, Arial, sans-serif;
    }
}
.col-3{
    width:10%;
}

.button--comment{
    height: 40px;
    width: 60px;
}

.time{
    font-size: 0.8rem;
    color: #aaaaaa;
    font-style: italic;
}


</style>