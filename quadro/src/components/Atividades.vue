<template>
    <v-row justify="center">
        <v-dialog v-model="dialog.aberto" width="600">
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
                    <h3 v-if="!this.verificaEdicao">
                        Adicionando Atividade no Quadro
                    </h3>
                    <h3 v-else>
                        Editando Atividade {{ dialog.id }}
                        <br>{{ titulo }}
                    </h3>
                </div>

                <br><br>
                <v-form>
                    <v-text-field class="input" :rules="[rules.required]" id="titulo" v-model="titulo" label="Título"
                        outlined></v-text-field>
                    <v-text-field class="input" :rules="[rules.required]" id="descricao" v-model="descricao"
                        label="Descrição" outlined></v-text-field>

                    <v-date-picker color="green lighten-1" locale="pt-br" v-model="dataInicio"></v-date-picker>

                    <v-textarea class="input" v-model="subTarefas" label="Sub-Taferas" outlined></v-textarea>
                    <v-textarea class="input" v-model="comentario" label="Comentários" outlined></v-textarea>

                    <v-date-picker v-if="statusRevisao" id="dataRevisao" :rules="[rules.required]" color="green lighten-1" locale="pt-br"
                        v-model="dataRevisao"></v-date-picker>
                    <br>
                    <v-btn dark color="green" class="salvar" variant="text" @click="salvar()">
                        <v-icon>
                            mdi-content-save
                        </v-icon>
                        Salvar
                    </v-btn>

                    <v-menu v-if="this.verificaEdicao" top :offset-x="offset">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dark color="black" class="mudarStatus" v-bind="attrs" v-on="on">
                                Mudar Status
                                <v-icon>
                                    mdi-arrow-right-bold
                                </v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item v-for="(item, index) in status" :key="index"
                                v-if="item.idStatus != atividade.idStatus">
                                <v-btn v-bind:color="item.color" variant="text"
                                    @click="mudarStatus(item.idStatus, item.tipo)">
                                    <span style="font-weight: bold;">
                                        {{ item.tipo }}
                                    </span>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>


                </v-form>
            </div>



        </v-dialog>
    </v-row>
</template>
<script>

export default {
    props: ["dialog"],
    data: () => ({
        aberto: false,
        atividade: {},
        titulo: null,
        descricao: null,
        dataInicio: null,
        subTarefas: null,
        comentario: null,
        dataRevisao: null,
        statusRevisao: false,
        verificaEdicao: false,
        rules: {
            required: value => !!value || 'Campo obrigatorio!',
        },

        status: [
        ],
        offset: true,
    }),
    methods: {
        async getDados() {

            const req = await fetch("  http://localhost:3000/atividades?id=" + this.dialog.id);

            const atividades = await req.json();
            this.atividade = atividades[0]
            //console.log(this.atividade);
            this.titulo = this.atividade.titulo
            this.descricao = this.atividade.descricao
            this.dataInicio = this.atividade.dataInicio

            this.subTarefas = this.atividade.subTarefas
            this.comentario = this.atividade.comentario

        },

        async getStatus() {

            const req = await fetch(" http://localhost:3000/status");
            const status = await req.json();
            this.status = status
            //console.log(this.status);


        },
        abrir: function (verificacao) {
            this.dialog.aberto = verificacao
        },
        salvar: function () {
            if (this.titulo.length == 0 || this.descricao.length == 0) {
                if (this.titulo.length == 0) {
                    document.getElementById("titulo").focus();
                } else {
                    document.getElementById("descricao").focus();
                }
            }
            else {

                var salvar = new Object();
                salvar.titulo = this.titulo
                salvar.descricao = this.descricao
                salvar.dataInicio = this.dataInicio
                salvar.subTarefas = this.subTarefas
                salvar.comentario = this.comentario

                if (!this.verificaEdicao) {
                    salvar.idStatus = 1
                    salvar.status = "Backlog"
                    //console.log(salvar)
                    this.adicionarAtividade(salvar)

                } else {
                    this.atualizarAtividade(salvar)

                }
                this.abrir(false)

            }
        },
        async adicionarAtividade(atividade) {
            const reqs = await fetch("  http://localhost:3000/atividades");
            const atividades = await reqs.json();
            atividade.id = atividades.at(-1).id + 1

            const dataJson = JSON.stringify(atividade);
            const req = await fetch("http://localhost:3000/atividades", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: dataJson
            });
            this.$fire({
                title: `Adição de atividade realizada com sucesso`,
                type: "success",
                timer: 3000
            }).then(r => {

            });
            setTimeout(() => {
                location.reload()
            }, "2750");
        },
        async atualizarAtividade(atividade) {
            const dataJson = JSON.stringify(atividade);
            const res = await fetch('http://localhost:3000/atividades/' + this.dialog.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: dataJson
            })

            this.$fire({
                title: `Edição realizada com sucesso`,
                type: "success",
                timer: 3000
            }).then(r => {

            });
            setTimeout(() => {
                location.reload()
            }, "2750");
        },
        mudarStatus(index, titulo) {
            //console.log("Mudar Status p/", index, '-', titulo)
            if (index == 5) {
                this.statusRevisao = true
                console.log(this.dataRevisao)
                if (this.dataRevisao != null) {
                    console.log('manda para mudarStatus com a data da revisão')
                    }
                else{
                   
                }
            } else {
                this.mudarStatusUpdate(index, titulo)
            }

            // this.dialog.aberto = false

            // 

        },
        async mudarStatusUpdate(index, titulo) {
            const res = await fetch('http://localhost:3000/atividades/' + this.dialog.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idStatus: index, status: titulo }),
            })
            // in any component

            this.$fire({
                title: `Alteração de Status realizada com sucesso`,
                text: `Do Status: ` + this.atividade.status + ` para ` + titulo,
                type: "success",
                timer: 3000
            }).then(r => {

            });
            setTimeout(() => {
                location.reload()
            }, "2750");


        },
        edicao: function () {
            if (!this.dialog.aberto) {
                this.dialog.id = 0

            }
            if (this.dialog.id == 0) {
                this.verificaEdicao = false
                this.titulo = ""
                this.descricao = ""
                this.dataInicio = null
                this.subTarefas = null
                this.comentario = null

            } else {
                this.verificaEdicao = true
                this.getDados()
                this.getStatus()

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
        dialog: {
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

.mudarStatus {
    background-color: rgb(0, 0, 0);
    margin-left: 15px;
    margin-bottom: 15px;
}
</style>