<template>
    <div data-app>
        <v-container class="quadro">
            <column-title />
            <task-card />
        </v-container>
    </div>
</template>
  
<script>
import ColumnTitle from "./Titulo.vue";
import TaskCard from "./Card.vue"
export default {
    name: 'ColunaNomeCertoAgora',
    props: [""],
    components: {
        ColumnTitle, TaskCard
    },
    data() {
        return {
            status: [],
            tasks: [],
        };
    },
    methods: {
        async getStatus() {
            const req = await fetch(" http://localhost:3000/status");
            this.status = await req.json();

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
    },
    created() {
    },
    mounted() {
        this.getStatus();
        this.getDados();
    },
}
</script>
  
  
<style scoped>
</style>
  