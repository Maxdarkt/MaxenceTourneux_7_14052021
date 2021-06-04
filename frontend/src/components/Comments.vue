<template>
    <div class="post__comments" v-if="displayCom[postId].id == postId && displayCom[postId].check == 1">
      <div v-for="comment in comments[postId]" :key="comment.id">
          <p>{{comment.username}} a écrit :  [{{comment.created}}] :<br/>
          {{ comment.message}} </p>
      </div>
    </div>  
</template>

<script>

export default {
    name : 'Comments',
    props: {
        postId : Number,
        displayCom: Array,
        comments: Array
    },
    }
</script>