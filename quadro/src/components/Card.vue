<template>
    <div data-app>
        <v-card class="card" @click="showModal(item.id)">
            Título: {{ item.titulo }} <br />Descrição: {{ item.descricao }}
        </v-card>
        <Atividade :open="open" @close="open = false">
        </Atividade>
    </div>
</template>
  
<script>
import Atividade from "./Atividade.vue";
import Coluna from "./Columa.vue";

export default {
    props: ["item"],
    components: {
        Atividade, Coluna,
    },
    data() {
        return {
            open: false,
        };
    },
    methods: {
        checkModal() {
            if (this.$route.name == 'EditarAtividade') {
                this.open = true;
            } else {
                this.open = false;
            }

        },
        showModal(id) {
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
            this.checkModal();
        },
        open(to, from) {
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
  