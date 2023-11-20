<template>
    <div>
        <v-dialog v-model="open" width="500">
            <template v-slot:activator="{ open }">
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">

                    <span>
                        Alterando para status <br>{{ status.tipo }}
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
                <v-card-text class="text-center">
                    <v-alert v-if="verificationDate" type="error">Data obrigatória!</v-alert>
                    <v-date-picker id="dateStatus" locale="pt-br" :color="status.color" v-model="date"></v-date-picker>
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
            type: Boolean,
            default: true
        },
        status: {
            type: Object,
        }
    },
    components: {
    },
    name: 'MudarStatusAtividade',
    data: () => ({
        listStatus: [],
        verificationDate: false,
        date: null,
    }),
    methods: {
        save() {

            if (this.date == null) {
                this.verificationDate = true
                document.getElementById("dateStatus").focus();
            } else {
                var dados = {
                    idStatus: this.status.idStatus,
                }
                if (this.status.idStatus == 4) {
                    dados.startDate = this.date
                } else if (this.status.idStatus == 5) {
                    dados.revisionDate = this.date
                }
                else {
                    dados.endDate = this.date
                }
                this.changeStatusUpdate(dados)
            }
        },
        async changeStatusUpdate(dados) {
            const res = await fetch('http://localhost:3000/atividades/' + this.$route.params.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            })
            this.date = null
            this.$emit('close')
        },
    },
    created() {
    },
    mounted() {
    },
    watch: {
    }
}
</script>
  
<style scoped></style>
  