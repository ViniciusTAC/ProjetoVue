<template>
    <div data-app>
        <v-row>
            <v-col v-for="(status) in listaDeStatus" :key="status.idStatus">
                <v-col v-for="(atividade) in atividades.filter(
                    (atv) => atv.idStatus == status.idStatus
                )" :key="atividade.id">
                    <v-card class="card" @click="adicionaRota(atividade.id)">
                        Título: {{ atividade.titulo }} <br />Descrição: {{ atividade.descricao }}
                    </v-card>
                </v-col>
            </v-col>
        </v-row>
        <Atividade :aberto="aberto" @close="aberto = false">
        </Atividade>
    </div>
</template>
  
<script>
import Atividade from "./Atividade.vue";
export default {
    props: [""],
    components: {
        Atividade,
    },
    data() {
        return {
            listaDeStatus: [],
            aberto: false,
            atividades: [],

        };
    },
    methods: {
        async getStatus() {
            const req = await fetch(" http://localhost:3000/status");
            this.listaDeStatus = await req.json();

        },
        async getDados() {
            const reqs = await fetch("  http://localhost:3000/atividades");
            this.atividades = await reqs.json();

            this.formataTexto();
        },
        formataTexto() {
            for (let index = 0; index < this.atividades.length; index++) {
                if (this.atividades[index].descricao.length > 60) {
                    this.atividades[index].descricao = this.atividades[
                        index
                    ].descricao.slice(0, 64);
                    this.atividades[index].descricao =
                        this.atividades[index].descricao + "...";
                }
            }
        },
        verificaModal() {
            if (this.$route.name == 'CriarAtividade' || this.$route.name == 'EditarAtividade') {
                this.aberto = true;

            } else {
                this.aberto = false;
            }

        },
        adicionaRota(id) {
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
        this.getStatus();
        this.getDados();
    },
    watch: {
        $route(to, from) {
            this.verificaModal();
        },
        aberto(to, from) {
            if (to == false) {
                this.$router.push('/').catch(() => { })
            }
        }
    },
}
</script>
  
  
<style scoped>
.card {
    text-align: justify;
    padding: 1%;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
</style>
  