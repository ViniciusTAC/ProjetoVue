<template>
    <div data-app>
        <div>
            <v-col v-for="(item, index) in atividades.filter(
                (atv) => atv.idStatus == items.idStatus
            )" :key="index" >
                <Card :item=item />
            </v-col>
        </div>
    </div>
</template>
  
<script>
import Card from "./Card.vue";
export default {
    props: ["items"],
    components: {
        Card,
    },
    data() {
        return {
            status: [],
            atividades: [],
            dialog: {
                aberto: false,
                id: 0,
            },
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
  
  
<style scoped>


</style>
  