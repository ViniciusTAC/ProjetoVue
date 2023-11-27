<template>
    <div class="text-center" v-if="open">
        <div class="edge_sub_tasks" v-for="(sub_task) in sub_task_list" :key='sub_task.id'>
            <v-checkbox v-model="sub_task.finished" @click="checkSubTask(sub_task)">
                <template v-slot:label>
                    <div class="label_checkbox" :class="{ checked: sub_task.finished }">
                        {{ sub_task.description }}
                    </div>
                </template>
            </v-checkbox>

            <v-btn class="button_delete" color="error" dark @click="deleteSubTasks(sub_task)">
                <v-icon>
                    mdi-delete
                </v-icon>
                Excluir
            </v-btn>

        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    props: {
        open: {
            type: Boolean,
            default: true
        },
        sub_task_list: {
            type: Array,
            default: null
        }
    },
    components: {

    },
    name: 'AdicionaSubTarefas',
    data: () => ({
    }),
    methods: {
        deleteSubTasks(sub_task) {
            let found_object = this.sub_task_list.find(object => object.id === sub_task.id);
            let new_array = this.sub_task_list.filter(element => element !== found_object);
            this.$emit('sendToTask', new_array);
            if (sub_task.id != null) {
                this.deleteSubTasksBackend(sub_task)

            }
        },
        deleteSubTasksBackend(sub_task) {
            const apiUrl = `http://localhost:3000/sub_tasks/${sub_task.id}`;
            axios.delete(apiUrl)
                .then(response => {
                })
                .catch(error => {
                    console.error('Erro na exclusão:', error);
                });
        },
        checkSubTask(sub_task) {
            this.checkSubTaskBackend(sub_task)

        },
        checkSubTaskBackend(sub_task) {
            const apiUrl = 'http://localhost:3000/sub_tasks/' + sub_task.id;
            axios.put(apiUrl, sub_task)
                .then(response => {
                })
                .catch(error => {
                    console.error(error);
                });
        },
        // checkEdication() {

        //     for (let index = 0; index < this.sub_task_list.length; index++) {
        //         if (this.sub_task_list[index].finished) {
        //             //this.checkSubTask(this.sub_task_list[index])
        //         }
        //     }
        // }

    },
    computed: {

    },
    mounted() {

    },
    watch: {
        open() {
            // if (this.open) {
            //     this.checkEdication()
            // }

        }
    }
}
</script>
  
<style scoped>
.edge_sub_tasks {
    display: flex;
    border-style: ridge;
    margin-bottom: 15px;
    padding-left: 5px;
}

.label_checkbox {
    width: 510px;
}

.button_delete {
    margin-top: 16px;
    margin-right: 5px;
}


.checked {
    color: #04AA6D;
    text-decoration: line-through;
    font-weight: bold;
}

/* Estilos para quando o checkbox não está marcado (falso) */
.label_checkbox:not(.checked) {
    color: #800000;
}
</style>
  