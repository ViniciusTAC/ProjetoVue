<template>
    <div data-app>
        <v-card class="card" @click="adicionaRota(itemFiltrado.id)">
            Título: {{ itemFiltrado.titulo }} <br />Descrição: {{ itemFiltrado.descricao }}
        </v-card>
        <Atividade :aberto="aberto" @close="aberto = false">
        </Atividade>
    </div>
</template>
  
<script>
import Atividade from "./Atividade.vue";
import Coluna from "./Columa.vue";
export default {
    props: ["itemFiltrado"],
    components: {
        Atividade, Coluna,
    },
    data() {
        return {
            aberto: false,
        };
    },
    methods: {
        verificaModal() {
            if (this.$route.name == 'EditarAtividade') {
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

    },
    watch: {
        $route(to, from) {
            if (this.itemFiltrado.id == this.$route.params.id) {
                this.verificaModal();
            }
            else {
                console.log('repetiu a mais')
            }
            // this.teste = this.teste + 1
            // console.log('2',this.item.id)
            // this.verificaModal();
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
  