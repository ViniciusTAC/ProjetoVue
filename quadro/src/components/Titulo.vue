<template>
  <div data-app>
    <v-container class="quadro">
      <v-row>
        <v-col v-for="(items, index) in status" :key="index">
          <v-card v-bind:color="items.color" class="titulo">{{
            items.tipo
          }}</v-card>
          <Coluna :items="items" />
        </v-col>
      </v-row>
    </v-container>
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
  props: {
  },
  methods: {
    async getStatus() {
      const req = await fetch(" http://localhost:3000/status");
      this.status = await req.json();

    },
  },
  created() {


  },
  mounted() {
    this.getStatus();

  },
}
</script>


<style scoped>
.quadro {
  max-width: 2000px !important;
  width: 150%;
}
</style>
