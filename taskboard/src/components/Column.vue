<template>
    <div class="column">
        <column-title :status="status" />
        <div v-for="(task) in task_list.filter(
            (tsk) => tsk.status_id == status.id
        )" :key="task.id">
            <task-card :task="task" />

        </div>


    </div>
</template>
  
<script>
import ColumnTitle from "./ColumnTitle.vue"
import TaskCard from "./TaskCard.vue"
import axios from 'axios';
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
        getData() {
            axios.get('http://localhost:3000/tasks')
                .then(response => {
                    this.task_list = response.data;
                })
                .catch(error => {
                    console.error('Erro ao obter lista de atividades:', error);
                });
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
  
