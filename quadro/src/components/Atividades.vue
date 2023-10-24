<template>
    <div :class="{ 'open': open }" class="modal">
        <div class="container">
            <v-btn dark color="red" small class="fechar" variant="text" @click="$emit('close')">
                <v-icon dark>
                    mdi-close
                </v-icon>Fechar
            </v-btn>
            <div class="texto">
                <h3 v-if="!this.verificaEdicao">
                    Adicionando Atividade no Quadro
                </h3>
                <h3 v-else>
                    Editando Atividade id: {{ dialog.id }}
                    <br>{{ titulo }}
                </h3>
            </div>
            <br><br>

            <v-form>
                <v-text-field class="input" :rules="[rules.required]" id="titulo" v-model="atividade.titulo" label="Título"
                    outlined></v-text-field>
                <v-text-field class="input" :rules="[rules.required]" id="descricao" v-model="atividade.descricao"
                    label="Descrição" outlined></v-text-field>
                <v-textarea class="input" v-model="atividade.subTarefas" label="Sub-Taferas" outlined></v-textarea>
                <v-textarea class="input" v-model="atividade.comentario" label="Comentários" outlined></v-textarea>

                <span style="  font-weight: bold;">Data Inicialização</span><br>
                <v-date-picker color="green lighten-1" locale="pt-br" v-model="atividade.dataInicio"></v-date-picker>

                <div v-if="statusRevisao">
                    <span style="  font-weight: bold;">Data Revisão</span><br>
                    <v-date-picker id="dataRevisao" :rules="[rules.required]" color="green lighten-1" locale="pt-br"
                        v-model="atividade.dataRevisao"></v-date-picker>
                </div>

                <div v-if="statusFinalizacao">
                    <span style="  font-weight: bold;">Data Finalização</span><br>
                    <v-date-picker id="dataFinalizacao" :rules="[rules.required]" color="green lighten-1" locale="pt-br"
                        v-model="atividade.dataFinalizacao"></v-date-picker>
                </div>
                <br>
                <v-btn dark color="green" class="salvar" variant="text" @click="salvar()">
                    <v-icon>
                        mdi-content-save
                    </v-icon>
                    Salvar
                </v-btn>

                <v-menu v-if="this.atividade.idStatus < 6" top :offset-x="offset">
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
                            <v-btn v-bind:color="item.color" variant="text" @click="mudarStatus(item.idStatus, item.tipo)">
                                <span style="font-weight: bold;">
                                    {{ item.tipo }}
                                </span>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-form>
        </div>
    </div>
</template>

<script>

export default {
    props: ["open"],
    data: () => ({
        aberto: false,
        atividade: {},
        statusRevisao: false,
        dataFinalizacao: null,
        statusFinalizacao: false,
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
            this.titulo = this.atividade.titulo
            this.descricao = this.atividade.descricao
            this.dataInicio = this.atividade.dataInicio
            this.dataRevisao = this.atividade.dataRevisao
            this.dataFinalizacao = this.atividade.dataFinalizacao
            this.subTarefas = this.atividade.subTarefas
            this.comentario = this.atividade.comentario
            if (this.atividade.idStatus == 5) {
                this.statusRevisao = true
            }
            if (this.atividade.idStatus == 6) {
                this.statusRevisao = true
                this.statusFinalizacao = true
            }
        },

        async getStatus() {
            const req = await fetch(" http://localhost:3000/status");
            const status = await req.json();
            this.status = status
        },

        abrir(verificacao) {
            this.dialog.aberto = verificacao
        },
        salvar() {
            if (!this.atividade.titulo || !this.atividade.descricao) {
                if (!this.atividade.titulo) {
                    document.getElementById("titulo").focus();
                } else {
                    document.getElementById("descricao").focus();
                }
            }
            else {
                var salvar = this.atividade;
                if (!this.verificaEdicao) {
                    salvar.idStatus = 1
                    salvar.status = "Backlog"
                    this.adicionarAtividade(salvar)
                } else {
                    if (this.atividade.idStatus = 5) {
                        salvar.dataRevisao = this.dataRevisao
                    }
                    if (this.atividade.idStatus = 6) {
                        salvar.dataRevisao = this.dataRevisao
                        salvar.dataFinalizacao = this.dataFinalizacao
                    }
                    this.atualizarAtividade(salvar)
                }
                this.$emit('close')
            }
        },
        async adicionarAtividade(atividade) {
            const reqs = await fetch("  http://localhost:3000/atividades");
            const atividades = await reqs.json();

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

            if (index < 5) {
                this.mudarStatusUpdate(index, titulo, null)
            }
            else {
                if (index == 5) {
                    this.statusRevisao = true
                    if (this.dataRevisao != null) {
                        this.mudarStatusUpdate(index, titulo, this.dataRevisao)
                    }


                }
                if (index == 6) {
                    this.statusFinalizacao = true
                    if (this.dataFinalizacao != null) {
                        this.mudarStatusUpdate(index, titulo, this.dataFinalizacao)
                    }


                }
            }
        },
        async mudarStatusUpdate(index, titulo, data) {
            var dados = {
                idStatus: index,
                status: titulo,
            }

            if (index < 5) {
                dados.dataFinalizacao = data
                dados.dataRevisao = data
            }
            else {
                if (index == 5) {
                    dados.dataRevisao = data
                    dados.dataFinalizacao = null
                }
                if (index == 6) {
                    dados.dataFinalizacao = data
                }

            }
            const res = await fetch('http://localhost:3000/atividades/' + this.dialog.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            })

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

            this.dialog.aberto = false
        },
        verficandoEdicao() {
            console.log(this.dialog.id)
            if (!this.open) {
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
    watch: {
        dialog: {
            handler: function () {
                this.verficandoEdicao()
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
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.botao {
    float: right;
    margin: auto;
}

.fechar {
    float: right;
}

.texto {
    width: 75%;
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



.modal {
    z-index: 99;
    background-color: #ffffff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    width: 55vw;
    height: 100%;
    border-radius: 6px;
    transition-property: top;
    transition-duration: 900ms;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.modal:not(.open) {
    display: none;
}

.modal.open {
    animation: fadeup 250ms;
}

@keyframes fadeup {
    from {
        opacity: 0;
        top: 53%;
    }

    to {
        opacity: 1;
        top: 50%;
    }
}

.modal .actions {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>