<template>
    <div>
        <v-dialog v-model="open" width="750">
            <template v-slot:activator="{ open }">
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    <v-spacer></v-spacer>
                    <span v-if="!checkEdition">Adicionar Atividade</span>
                    <span v-else>Editando Atividade id: {{ task.id }}
                        <br>
                        Título: {{ task.title }}
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn color="error" dark @click="close()">
                        <v-icon>
                            mdi-close
                        </v-icon>
                        Fechar

                    </v-btn>
                </v-card-title>

                <br>
                <v-card-text>
                    <v-text-field label="Título" outlined v-model="task.title"></v-text-field>
                    <v-text-field label="Descrição" outlined v-model="task.description"></v-text-field>


                    <div class="sub_task">
                        <v-text-field label="SubTarefa" class="sub_task_input" outlined v-model="sub_task"></v-text-field>
                        <v-btn color="accent" class="sub_task_button" dark @click="addSubTask()">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                            Adicionar Sub-Tarefa
                        </v-btn>
                        <hr>
                    </div>

                    <sub-tasks :open="open_sub_tasks" :sub_task_list="sub_task_prop" @close="open_sub_tasks = false"
                        @sendToTask="receiveFromSubTasks" />


                    <br>
                    <v-textarea outlined name="input-7-2" label="Comentário" v-model="task.comments"></v-textarea>
                    <div v-if="checkEdition" class="text-center">
                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Início</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.start_date"></v-date-picker>
                        </div>

                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Revisão</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.revision_date"></v-date-picker>
                        </div>
                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Finalização</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.end_date"></v-date-picker>
                        </div>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="success" dark @click="save()">
                        <v-icon>
                            mdi-content-save
                        </v-icon>
                        Salvar

                    </v-btn>
                    <div v-if="checkEdition" class="changeStatus">
                        <v-menu top offset-x>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                    Mudar status
                                    <v-icon>
                                        mdi-arrow-right-bold
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(status) in status_list" :key="status.status_id"
                                    v-if="status.id != task.status_id">
                                    <v-btn v-bind:color="status.color" variant="text" @click="changeStatus(status)">
                                        <span style="font-weight: bold;">
                                            {{ status.name }}
                                        </span>
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import SubTasks from "./Sub-Tasks.vue"
import axios from 'axios';
export default {
    props: {
        open: {
            type: Boolean,
            default: true
        }
    },
    components: {
        SubTasks
    },
    name: 'Atividade',
    data: () => ({
        task: {},
        status_list: [],
        checkEdition: false,
        open_sub_tasks: false,
        sub_task: null,
        sub_task_prop: [],
        dataChangeStatus: {}
    }),
    methods: {
        close() {
            this.sub_task_prop = []
            this.open_sub_tasks = false
            this.$emit('close')
        },
        receiveFromSubTasks(value_sub_tasks) {
            this.sub_task_prop = value_sub_tasks
        },
        addSubTask() {
            var task_id = null
            if (this.checkEdition) {
                var task_id = this.addSubTaskBackendOnce()
                this.getSubTask()
            }
            this.open_sub_tasks = true
            this.sub_task_prop.push(
                {
                    description: this.sub_task,
                    finished: false
                }
            )
            if (task_id != null) {
                this.sub_task_prop[new_element_position].id = task_id
            } else {
                let new_element_position = this.sub_task_prop.length - 1;
                this.sub_task_prop[new_element_position].id = new_element_position + 1
            }

            //console.log(this.sub_task_prop)
            this.sub_task = null
        },
        save() {
            this.checkEdition ? this.updatedTaks() : this.addTask()
        },
        addTask() {
            const apiUrl = 'http://localhost:3000/tasks/';

            var date = this.task
            date.start_date = null,
                date.revision_date = null,
                date.end_date = null,
                date.status_id = 3
            date.sub_tasks_attributes = this.sub_task_prop.map(({ id, ...restoDaSubTask }) => ({ ...restoDaSubTask }));

            axios.post(apiUrl, date)

                .then(response => {
                    //this.addSubTaskBackend(response.data.id)
                    this.$emit('close')
                })
                .catch(error => {
                    console.error(error);
                });

        },
        addSubTaskBackendOnce() {
            const apiUrl = 'http://localhost:3000/sub_tasks/';
            var task_id = null
            var date = {
                description: this.sub_task,
                finished: false,
                task_id: this.$route.params.id
            }
            axios.post(apiUrl, date)
                .then(response => {
                    task_id = response.data.id
                    // console.log('response',response.data.id)
                    // console.log('task1',task_id)
                    return task_id
                })
                .catch(error => {
                    console.error(error);
                });

        },
        addSubTaskBackend(id_task) {
            const apiUrl = 'http://localhost:3000/sub_tasks/';

            var date = {}
            for (let index = 0; index < this.sub_task_prop.length; index++) {
                date = this.sub_task_prop[index]
                date.task_id = id_task
                axios.post(apiUrl, date)
                    .then(response => {
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }


        },
        updatedTaks() {
            const apiUrl = 'http://localhost:3000/tasks/' + this.$route.params.id;
            axios.put(apiUrl, this.task)
                .then(response => {
                    this.getSubTask()
                    this.$emit('close')
                })
                .catch(error => {
                    console.error(error);
                });
        },
        changeStatus(status) {
            var data = {
                status_id: status.id
            }
            //console.log(data)
            //this.changeStatusUpdate(dada)


        },
        async changeStatusUpdate(data) {
            const res = await fetch('http://localhost:3000/atividades/' + this.$route.params.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            this.$emit('close')
        },
        getData() {
            axios.get("http://localhost:3000/tasks/" + this.$route.params.id)
                .then(response => {
                    this.task = response.data;
                })
                .catch(error => {
                    console.error('Erro ao obter dados da Atividade:', error);
                });
        },
        // getSubTask() {
        //     axios.get("http://localhost:3000/sub_tasks/by_task_id/" + this.$route.params.id)
        //         .then(response => {
        //             if (response.data != 0) {
        //                 this.open_sub_tasks = true
        //                 this.sub_task_prop = response.data
        //             }

        //         })
        //         .catch(error => {
        //             console.error('Erro ao obter dados da Sub Tarefas:', error);
        //         });
        // },

        getSubTask() {
            axios.get("http://localhost:3000/sub_tasks", {
                params: {
                    task_id: this.$route.params.id
                }
            })
                .then(response => {
                    if (response.data != 0) {
                        this.open_sub_tasks = true
                        this.sub_task_prop = response.data
                    }

                })
                .catch(error => {
                    console.error('Erro ao obter dados da Sub Tarefas:', error);
                });
        },

        getStatus() {
            axios.get('http://localhost:3000/statuses')
                .then(response => {
                    this.status_list = response.data;
                })
                .catch(error => {
                    console.error('Erro ao obter lista de Status:', error);
                });


        },
        checkingEdit() {
            if (this.$route.params.id == undefined) {
                this.checkEdition = false
                this.task = {}

            } else {
                this.checkEdition = true
                this.getData()
                this.getStatus()
                this.getSubTask()
            }
        },
    },
    watch: {
        $route() {
            this.checkingEdit()
        },
        open() {
            this.checkingEdit()
        },
    }
}
</script>
  
<style scoped>
.sub_task {
    display: flex;
}

.changeStatus {
    margin-left: 15px;
}

.sub_task_input {
    margin-right: 15px;
}

.sub_task_button {
    height: 56px !important;
}
</style>