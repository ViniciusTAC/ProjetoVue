<template>
    <div class="taskCard">
        <v-card class="card" @click="addRoute(task.id)">
            Título: {{ task.title }}
            <br>
            Descrição {{ task.description }}
        </v-card>
        <task :open="open" @close="open = false" />



    </div>
</template>
  
<script>
import Task from "./Task.vue"
export default {
    props: {
        task: {
            type: Object
        }
    },
    components: {
        Task
    },
    name: 'CardAtividade',
    data: () => ({
        open: false
    }),
    methods: {
        openDialog() {
            this.open = true
        },
        checkModal() {
            if (this.$route.name == 'CriarAtividade' || this.$route.name == 'EditarAtividade') {
                this.aberto = true;

            } else {
                this.aberto = false;
            }

        },
        addRoute(id) {
            this.$router.push({
                name: 'EditarAtividade', params: {
                    id: id
                }
            }).catch(() => { })
        }

    },
    created() {
    },
    mounted() {
    },
    watch: {
        $route(to, from) {
            this.checkModal();
        },
        open(to, from) {
            if (to == false) {
                this.$router.push('/').catch(() => { })
            }
        }
    },
}
</script>
  
<style scoped>
.taskCard {
    margin-top: 15px;
}

.card {
    padding: 5px;
}
</style>