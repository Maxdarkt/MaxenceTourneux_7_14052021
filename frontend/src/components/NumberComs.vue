<template>
    <span>
            {{ numberOfComments }}
    </span>
</template>

<script>


export default {
    name : 'NumberComs',
    data() {
        return {

        }
    },
    props: {
        numberOfComments: Number
    },
}
</script>
