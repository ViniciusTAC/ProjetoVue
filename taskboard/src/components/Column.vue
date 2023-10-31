<template>
    <div class="column">
        <!-- titulo :status = status -> somente o titulo da coluna! 

        div v-for atividades.filter( status.idStatus)
            card -> detalhes da atividade -->

        <column-title />
        <task-card />

    </div>
</template>
  
<script>
import ColumnTitle from "./Column-Title.vue"
import TaskCard from "./Task-Card.vue"
export default {
    props: {},
    components: {
        ColumnTitle,
        TaskCard,
    },
    name: 'Coluna',
    data: () => ({
    }),
}
</script>
  
<style scoped>
.column {
    width: 100%;
}
</style>
  
