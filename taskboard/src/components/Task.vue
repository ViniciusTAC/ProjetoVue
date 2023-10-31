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
                    <v-textarea outlined name="input-7-2" label="Comentário" v-model="task.comment"></v-textarea>
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
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>

export default {
    props: {
        open: {
            type: Boolean
        }
    },
    components: {
    },
    name: 'Atividade',
    data: () => ({
        task: {},
        checkEdition: false
    }),
    methods: {
        save() {
            this.addTask()
        },
        async addTask() {
            this.task.idStatus = 1
            const dataJson = JSON.stringify(this.task);
            const req = await fetch("http://localhost:3000/atividades", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: dataJson
            });
            this.$emit('close')
        },
        async getData() {

            const req = await fetch("  http://localhost:3000/atividades?id=" + this.$route.params.id);
            const atividades = await req.json();
            this.task = atividades[0]
        },
        checkingEdit() {
            //console.log("teste")
            if (this.$route.params.id == undefined) {
                this.checkEdition = false
                this.task = {}

            } else {
                this.checkEdition = true
                this.getData()
            }
        },
    },
    watch: {
        $route() {
            //console.log(this.$route.params.id)
            this.checkingEdit()
        },
        open() {
            //console.log("watch open", this.open)
            this.checkingEdit()
        }
    }
}
</script>
  
<style scoped></style>