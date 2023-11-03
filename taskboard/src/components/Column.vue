<template>
    <div class="column">
        <column-title :status="status" />
        <div v-for="(task) in task_list.filter(
            (tsk) => tsk.idStatus == status.idStatus
        )" :key="task.id">
            <task-card :task="task" />

        </div>


    </div>
</template>
  
<script>
import ColumnTitle from "./ColumnTitle.vue"
import TaskCard from "./TaskCard.vue"
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
        task_list: [],
    }),
    methods: {
        async getData() {
            const req = await fetch("http://localhost:3000/atividades");
            this.task_list = await req.json();
        }
    },
    created() {
    },
    mounted() {
        this.getData();
    },
    watch: {
        $route(to, from) {
            this.getData()
        },
    }
}
</script>
  
<style scoped></style>
  
