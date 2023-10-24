<template>
    <div data-app>
        <v-card class="card" @click="showModal(`atividade/:` + item.id)">
            <Atividades :open="open" @close="open = false">
            </Atividades>
            Título: {{ item.titulo }} <br />Descrição: {{ item.descricao }}
        </v-card>
    </div>
</template>
  
<script>
import Atividades from "./Atividades.vue";
import Coluna from "./Columa.vue";

export default {
    props: ["item"],
    components: {
        Atividades, Coluna,
    },
    data() {
        return {
            open: false,
        };
    },
    methods: {
        showModal(name) {
            console.log(name)
            // this.$router.push(name).catch(() => { })
        }
    },
    created() {
    },
    mounted() {

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
  