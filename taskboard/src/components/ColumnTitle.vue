<template>
    <div>
        <v-card :color="status.color" class="title">
            {{ status.tipo }}
        </v-card>


    </div>
</template>
  
<script>

export default {
    props: {
        status: {
            type: Object
        }
    },
    components: {
    },
    name: 'Título',
    data: () => ({
    }),
}
</script>
  
<style scoped>
.title{
    text-align: center;
}
</style>