<template>
  <div data-app>
    <v-row>
      <v-col v-for="(status) in listaDeStatus" :key="status.idStatus">
        <v-card :color="status.color" class="titulo">{{
          status.tipo
        }}</v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'ColumnTitle',
  props: {
    status: {
      type: Object
    }
  },
  components: {
  },
  data() {
    return {
      listaDeStatus: [],
    };
  },
  methods: {
    async getStatus() {
      const req = await fetch(" http://localhost:3000/status");
      this.listaDeStatus = await req.json();

    },

  },
  created() {
  },
  mounted() {
    this.getStatus();
  },
}
</script>


<style scoped></style>
