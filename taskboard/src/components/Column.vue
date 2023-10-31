<template>
    <div class="column">
        <!-- titulo :status = status -> somente o titulo da coluna! 

        div v-for atividades.filter( status.idStatus)
            card -> detalhes da atividade -->

        <column-title :status="status" />
        <div v-for="(task) in taskList.filter(
            (tsk) => tsk.idStatus == status.idStatus
        )" :key="task.id">
            <task-card :task="task" />

        </div>


    </div>
</template>
  
<script>
import ColumnTitle from "./Column-Title.vue"
import TaskCard from "./Task-Card.vue"
export default {
    props: {
        status: {
            type: Object
        }
    },
    components: {
        ColumnTitle,
        TaskCard,
    },
    name: 'Coluna',
    data: () => ({
        taskList: [],
    }),
    methods: {
        async getData() {
            const req = await fetch("http://localhost:3000/atividades");
            this.taskList = await req.json();
        }
    },
    created() {
    },
    mounted() {
        this.getData();
    },
    watch: {
        $route(to, from) {
            //console.log("watch  $route", from)

            this.getData()
        },
    }
}
</script>
  
<style scoped></style>
  
