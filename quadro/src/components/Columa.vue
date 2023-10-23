<template>
    <div data-app>
        <div>
            <br>
            <Atividades :dialog="dialog" />
            <v-col v-for="(item, index) in atividades.filter(
                (atv) => atv.idStatus == items.idStatus
            )" :key="index" @click="abrirDialog(true, item.id)">
                <Card :item=item />
                <!-- <v-card class="card">
                    Título: {{ item.titulo }} <br />Descrição: {{ item.descricao }}
                </v-card> -->
            </v-col>
        </div>
    </div>
</template>
  
<script>
import Atividades from "./Atividades.vue";
import Card from "./Card.vue";
export default {
    props: ["items"],
    components: {
        Atividades, Card,
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
            const req = await fetch(" http://localhost:3000/status");
            this.status = await req.json();

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
        abrirDialog(verificacao, id) {
            this.dialog.id = id;
            this.dialog.aberto = verificacao;
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
.quadro {
    max-width: 2000px !important;
    width: 150%;
}

.titulo {
    font-weight: bold;
    margin-bottom: 5px;
}

.card {
    text-align: justify;
    padding: 1%;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
</style>
  