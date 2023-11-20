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
                    <v-btn color="error" dark @click="$emit('close')">
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
                    <v-textarea outlined name="input-7-2" label="SubTarefas" v-model="task.subtasks"></v-textarea>
                    <v-textarea outlined name="input-7-2" label="Comentário" v-model="task.comments"></v-textarea>
                    <div v-if="checkEdition" class="text-center">
                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Início</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.startDate"></v-date-picker>
                        </div>

                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Revisão</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.revisionDate"></v-date-picker>
                        </div>
                        <div>
                            <span style="  font-weight: bold;font-size: large;">Data Finalização</span><br>
                            <v-date-picker v-if="checkEdition" locale="pt-br" v-model="task.endDate"></v-date-picker>
                        </div>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="sucess" dark @click="save()">
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
                        <change-task-status :open="openChange" :status="dataChangeStatus" @close="openChange = false" />
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import ChangeTaskStatus from "./Change-Task-Status.vue"
import axios from 'axios';
export default {
    props: {
        open: {
            type: Boolean,
            default: true
        }
    },
    components: {
        ChangeTaskStatus
    },
    name: 'Atividade',
    data: () => ({
        task: {},
        status_list: [],
        checkEdition: false,
        openChange: false,
        dataChangeStatus: {}
    }),
    methods: {
        save() {
            this.checkEdition ? this.updatedTaks() : this.addTask()
        },
        addTask() {
            // this.task.idStatus = 1
            // const dataJson = JSON.stringify(this.task);
            // const req = await fetch("http://localhost:3000/atividades", {
            //     method: "POST",
            //     headers: { "content-Type": "application/json" },
            //     body: dataJson
            // });
            // this.$emit('close')

            // URL da API
            const apiUrl = 'http://localhost:3000/tasks/';

            // Dados a serem enviados no corpo da solicitação
            var date = this.task
            date.startDate = null,
                date.revisionDate = null,
                date.endDate = null,
                date.status_id = 3
            // Fazendo a solicitação POST
            axios.post(apiUrl, date)
                .then(response => {
                    // Manipular a resposta aqui
                    this.$emit('close')
                })
                .catch(error => {
                    // Lidar com erros aqui
                    console.error(error);
                });

        },
        async updatedTaks() {
            const apiUrl = 'http://localhost:3000/tasks/'+ this.$route.params.id;
            axios.put(apiUrl, this.task)
                .then(response => {
                    this.$emit('close')
                })
                .catch(error => {
                    console.error(error);
                });
        },
        changeStatus(status) {
            var data = status
            if (data.idStatus >= 5 || data.idStatus == 4) {
                this.openChange = true
                this.dataChangeStatus = data
            } else {
                var dada = {
                    idStatus: data.idStatus
                }
                this.changeStatusUpdate(dada)
            }

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
        openChange() {
            if (!this.openChange) {
                this.$emit('close')
            }
        }
    }
}
</script>
  
<style scoped>
.changeStatus {
    margin-left: 15px;
}
</style>