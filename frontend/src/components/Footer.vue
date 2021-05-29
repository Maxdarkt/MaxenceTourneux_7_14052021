<template>
  <footer class="footer">
    <div class="footer__container">
      <div>
        <h4>Titre 1</h4>
        <ul>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
        </ul>
      </div>
      <div>
        <h4>Titre 1</h4>
        <ul>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
        </ul>
      </div>
      <div>
        <h4>Titre 1</h4>
        <ul>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
        </ul>
      </div>
      <div>
        <h4>Titre 1</h4>
        <ul>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
          <li>Aaaaaaa</li>
        </ul>
      </div>
    </div>
    <div class="footer__pied">
      <p>&#xa9; {{ year() }} GROUPOMANIA</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  },
  methods:{
    year (){
      const year = new Date()
      return year.getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../sass/_variables';

.footer{
    background-color: $color-bg-third;
    height:150px;
    margin-bottom : 0px;
    color: white;
    font-size: 0.9rem;
    padding-top: 30px;
    &__container{
    text-align: justify;
    display: flex;
    justify-content: space-around;
    }
    &__pied{
      display:flex;
      justify-content: center;
      align-items: center;
      margin : 0px;
      height:50px;
      background-color: #000000;
      p{
        margin: 0px;
        color: #666666;
      }
    }
    h4{
      color: $color-second;
      font-size: 1rem;
    }

    // background-image: url("../assets/heartColorBlack.jpg");
    // background-position: center;
    // background-size: contain;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  text-align: start;
  line-height: 1.5rem;
}
</style>
