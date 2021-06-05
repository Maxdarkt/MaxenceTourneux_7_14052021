<template>

</template>

<script>
import { mapState } from 'vuex'
// import router from '../router/index'

const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export default {

    name : 'GetAllPosts',
    props: {

    },
    data() {
        return {
            loading: true,

        }
    },
    computed: {
 
        },
        ...mapState(['user'])
    },
    created () {
    instance.defaults.headers.common['Authorization'] = 'Bearen ' + this.$store.state.user.token;

    },
    mounted () {      
        
    },
    methods: {

    }
}

  
</script>


<style lang="scss" scoped>
@import '../sass/_variables';



</style>