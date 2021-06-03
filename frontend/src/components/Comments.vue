<template>
    <div class="post__comments" v-if="displayCom[postId].id == postId && displayCom[postId].check == 1">
      <p>commentaire 1 du post {{postId}}</p>
      <p>commentaire 2 du post {{postId}} </p>
      <p>commentaire 3 du post {{postId}}</p>
      <p>{{displayCom[postId].id}}</p>
      <p>{{displayCom[postId].check}}</p>
    </div>  
</template>

<script>

export default {
    name : 'Component',
    props: {
        postId : Number,
        displayCom: Array
    },
    }
</script>