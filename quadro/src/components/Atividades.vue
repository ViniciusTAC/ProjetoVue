<template>
    <v-row justify="center">
        <v-dialog v-model="dialogs.dialog" width="600">
            <template v-slot:activator="{ props }">
                <!-- <v-btn class="botao" color="primary" @click="abrir(true)" v-bind="props">
                    Adicionar Atividades
                </v-btn> -->
            </template>

            <div class="container">
                <v-btn dark color="red" small class="fechar" variant="text" @click="abrir(false)">
                    <v-icon dark>
                        mdi-close
                    </v-icon>Fechar
                </v-btn>
                <div class="texto">
                    <h3 v-if="!this.edicaoBol">
                        Adicionando Atividade no Quadro
                    </h3>
                    <h3 v-else>
                        Editando Atividade {{ dialogs.id }}
                        <br>{{ titulo }}
                    </h3>
                </div>

                <br><br>
                <v-form>
                    <v-text-field class="input" :rules="[rules.required]" id="titulo" v-model="titulo" label="Título"
                        outlined></v-text-field>
                    <v-text-field class="input" :rules="[rules.required]" id="descricao" v-model="descricao"
                        label="Descrição" outlined></v-text-field>

                    <v-date-picker v-if="!this.edicaoBol" color="green lighten-1"  locale="pt-br" v-model="dataFinalizacao"></v-date-picker>

                    <v-textarea class="input" v-model="subTarefas" label="Sub-Taferas" outlined></v-textarea>
                    <v-textarea class="input" v-model="comentario" label="Comentários" outlined></v-textarea>
                    <br>
                    <v-btn dark color="green" class="salvar" variant="text" @click="salvar()">
                        <v-icon>
                            mdi-content-save
                        </v-icon>
                        Salvar
                    </v-btn>

                </v-form>
            </div>



        </v-dialog>
    </v-row>
</template>
<script>

export default {
    props: ["dialogs"],
    data: () => ({
        dialog: false,
        titulo: '',
        descricao: '',
        dataFinalizacao: '',
        subTarefas: '',
        comentario: '',
        edicaoBol: false,
        rules: {
            required: value => !!value || 'Campo obrigatorio!',
        },
    }),
    methods: {
        abrir: function (verificacao) {
            this.titulo = ''
            this.descricao = ''
            this.subTarefas = ''
            this.comentario = ''
            this.dialogs.dialog = verificacao
        },
        salvar: function () {
            console.log(this.dataFinalizacao)
            // if (this.titulo.length == 0 || this.descricao.length == 0) {
            //     if (this.titulo.length == 0) {
            //         document.getElementById("titulo").focus();
            //     } else {
            //         document.getElementById("descricao").focus();
            //     }
            // }
            // else {
            //     var salvar = new Object();
            //     salvar.titulo = this.titulo
            //     salvar.descricao = this.descricao
            //     salvar.subTarefas = this.subTarefas
            //     salvar.comentario = this.comentario
            //     console.log(salvar)
            //     this.abrir(false)
            // }
        },
        edicao: function () {
            if (this.dialogs.id == 0) {
                this.edicaoBol = false
            } else {
                this.edicaoBol = true

            }
        },
    },
    computed: {

    },
    mounted() {
    },
    created() {

    },
    watch: {
        dialogs: {
            handler: function () {
                this.edicao()
            },
            deep: true
        },
    }
}
</script>
<style scoped>
.container {
    background-color: white;
    padding: auto;
}

.botao {
    float: right;
    margin: auto;
}

.fechar {
    float: right;
}

.texto {
    text-align: center;
}


.input {
    padding-top: 5px;
    margin: 5px;
    max-width: 95%;
}

.salvar {
    background-color: rgb(0, 0, 0);
    margin-bottom: 15px;
}
</style>