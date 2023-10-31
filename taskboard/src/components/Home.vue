<template>
  <div class="quadro">
    <h1 class="titulo">
      Quadro de Atividades
    </h1>
    <v-btn color="primary" @click="">
      <v-icon>
        mdi-plus
      </v-icon>
      Adicionar Atividade</v-btn>
    <columns />
  </div>
</template>

<script>
import Columns from "./Columns.vue"
export default {
  props: {},
  components: {
    Columns,
  },
  name: 'Home',
  data: () => ({
  }),
}
</script>

<style scoped>
.quadro {
  margin: 10px;
  width: 100%;
}

.titulo {
  text-align: center;
}
</style>
