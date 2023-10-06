<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="600">
            <template v-slot:activator="{ props }">
                <v-btn class="botao" color="primary" @click="abrir(true)" v-bind="props">
                    Adicionar Atividades
                </v-btn>
            </template>

            <div style="background-color: white;">
                <div>
                    <h3>
                        Adicionando Atividade no Quadro
                    </h3>
                    <v-btn dark color="red" small class="fechar" variant="text" @click="abrir(false)">
                        <v-icon dark>
                            mdi-close
                        </v-icon>Fechar
                    </v-btn>
                </div>


                <v-form>
                    <v-text-field class="input" :rules="[rules.required]" v-model="titulo" label="Título"
                        outlined></v-text-field>
                    <br>
                    <v-text-field class="input" :rules="[rules.required]" v-model="descricao" label="Descrição"
                        outlined></v-text-field>
                    <br>
                    <v-textarea class="input" v-model="subTarefas" label="Sub-Taferas" counter maxlength="500" full-width
                        outlined></v-textarea>
                    <br>
                    <v-textarea class="input" v-model="comentario" label="Comentários" counter full-width
                        single-line></v-textarea>
                    <br>
                    <br>
                    <v-btn dark color="green" class="salvar" variant="text" @click="abrir(false)">
                        Salvar
                    </v-btn>
                </v-form>
            </div>



        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        dialog: false,
        titulo: '',
        descricao: '',
        subTarefas: '',
        comentario: '',
        rules: {
            required: value => !!value || 'Field is required',
        },
    }),
    methods: {
        abrir: function (verificacao) {
            this.titulo = ''
            this.descricao = ''
            this.subTarefas = ''
            this.comentario = ''
            this.dialog = verificacao
        }
    }
}
</script>
<style scoped>
.botao {
    margin: auto;
}

.fechar {
    margin: -1;
}

.input {
    padding-top: 5px;
    margin: auto;
    max-width: 75%;
}

.salvar {
    background-color: rgb(0, 0, 0);
    margin-bottom: 15px;
}
</style>