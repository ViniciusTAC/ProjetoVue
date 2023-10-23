<template>
  <div data-app>
    <div>
      <v-container class="quadro">
     
        <v-row>
          <v-col v-for="(items, index) in status" :key="index">
            <v-card v-bind:color="items.color" class="titulo">{{
              items.tipo
            }}</v-card>
            <Coluna  :items="items"/>
          </v-col>
        </v-row>

        <!-- <v-row>
          <v-col v-for="(items, index) in status" :key="index">
            <v-card v-bind:color="items.color" class="titulo">{{
              items.tipo
            }}</v-card>
            <v-col v-for="(item, index) in atividades.filter(
              (atv) => atv.idStatus == items.idStatus
            )" :key="index" @click="abrirDialog(true, item.id)">
              <v-card class="card">
                Título: {{ item.titulo }} <br />Descrição: {{ item.descricao }}
              </v-card>
            </v-col>
          </v-col>
        </v-row> -->
      </v-container>
    </div>
  </div>
</template>

<script>
import Coluna from "./Columa.vue";
export default {
  components: {
    Coluna,
  },
  data() {
    return {
      status: [],
      atividades: [],
    };
  },
  name: 'Titulo',
  props: {
  },
  methods: {
    async getDados() {
      const req = await fetch(" http://localhost:3000/status");
      this.status = await req.json();

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
</style>
