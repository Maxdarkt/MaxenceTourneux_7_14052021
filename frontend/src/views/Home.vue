<template>
<div class="home">

      <h1>Hello World !</h1>



</div><!--End Home-->

</template>

<script>


export default {
  name: 'App',
  data() {
    return {
    application : [
      {
        title: "Troubles du système musculaire, ostéo-articualire",
        example: "Rhumatisme, arthrose, arthrite, lombalgie, ostéoporose, sciatique, fibromyalgie, entorse..."
      },
      {
        title: "Troubles du système digestif",
        example: "Gastrite, trouble fonctionnel de l'estomac, maladie de l'oesophage, constipation..."
      }
    ]} 
  }
}

</script>

<style lang="scss">
@import '../sass/_variables';

.home{
  width: 100%;
  margin-top:150px;
}

</style>