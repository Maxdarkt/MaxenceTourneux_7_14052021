<template>
<div class="home">

      <h1>Hello World !</h1>



</div><!--End Home-->

</template>

<script>

window.onscroll = function () {
  if(document.documentElement.scrollTop > 50) {
    document.querySelector('.nav').style.background = "white";
    document.querySelector('.nav').style.height = "60px";
    document.querySelector('.nav img').style.height = "50px";

  }else{
        document.querySelector('.nav').style.background = "white";
        document.querySelector('.nav').style.height = "150px";
        document.querySelector('.nav img').style.height = "80px";
  }
}

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
  &__title{
    background-image: url("../assets/expectrumColor.png");
    background-size: cover;
    background-position: center;
    h1{
      font-size : 3rem;
    }
    h2{
      font-size : 2rem;
    }
  }
  &__description{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height:300px;
  }

  &__description__img{
    background-image: url("../assets/womanColor.jpg");
    background-size: cover;
    background-position: center;
    width:39%;
    height:100%;
  }
  &__description__text{
    padding:10px;
    text-align: justify;
    width: 59%;
    overflow: auto;
  }
  &__description-2{
    padding:10px;
    text-align: justify;
    display : flex;
    justify-content: space-around;
    &__text{
      width: 49%;
    }
    &__img{
      width: 49%;
    background-image: url("../assets/mapMondeColor.png");
    background-size: cover;
    background-position: center;
    }
  }
  &__application{
    padding:10px;
    text-align: justify;
    margin-bottom: 50px;;
    &__container{
    min-height: 550px;
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
    }
    &__container__card{
      margin:10px;
      height: 170px;
      width:250px;
      border-radius:10px;
      background-color: lighten($color-second, 30%);
          box-shadow: 10px 10px 8px $color-bg-first;
      &__img{
        margin:10px;
      }
      &__text{
        margin:10px;
        p{
        color:#666666;
        }
      }
    }
  }
}

.separateur{
  width : 100%;
  display: flex;
  justify-content: center;
  margin : 40px 0px 40px 0px;
  &__ligne{
    width:50%;
  border-top: 2px solid $color-bg-first;
  }
  h3{
    color: $color-second;
    font-weight: bold;
    font-size: 1.8rem;
  }

}

</style>