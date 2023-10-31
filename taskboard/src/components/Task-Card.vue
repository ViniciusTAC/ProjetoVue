<template>
    <div class="taskCard">
        <!-- titulo :status = status -> somente o titulo da coluna! 

        div v-for atividades.filter( status.idStatus)
            card -> detalhes da atividade -->
        <v-card>
            atividade
        </v-card>


    </div>
</template>
  
<script>

export default {
    props: {},
    components: {
    },
    name: 'CardAtividade',
    data: () => ({
    }),
}
</script>
  
<style scoped>
.taskCard{
    margin-top: 15px;
}
</style>