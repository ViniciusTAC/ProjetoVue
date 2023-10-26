<template>
    <div data-app>
        <div>
            <v-col v-for="(item, index) in atividades.filter(
                (atv) => atv.idStatus == status.idStatus
            )" :key="index">
                <Card :itemFiltrado=item />
            </v-col>
        </div>
    </div>
</template>
  
<script>
import Card from "./Card.vue";
export default {
    props: ["status"],
    components: {
        Card,
    },
    data() {
        return {
            atividades: [],
        };
    },
    methods: {
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
    },
    created() {
    },
    mounted() {
        this.getDados();
    },
}
</script>
  
  
<style scoped></style>
  