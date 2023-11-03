<template lang="pt-br">
  <div class="board">
    <div class="title">
      <span style="font-size: 30px;">
        Quadro de Atividades
      </span>
    </div>
    <br>
    <v-btn color="primary" dark @click="addRoute()">
      <v-icon>
        mdi-plus
      </v-icon>
      Adicionar Atividade
    </v-btn>
    <task :open="open" @close="open = false" />
    <columns />
  </div>
</template>

<script>
import Task from "./Task.vue"
import Columns from "./Columns.vue"
export default {
  props: {},
  components: {
    Task, Columns,
  },
  name: 'Home',
  data: () => ({
    open: false
  }),
  methods: {
    openDialog() {
      this.open = true
    },
    checkModal() {
      if (this.$route.name == 'CriarAtividade' || this.$route.name == 'EditarAtividade') {
        this.open = true;
      } else {
        this.open = false;
      }

    },
    addRoute() {
      this.$router.push({
        name: 'CriarAtividade'
      }).catch(() => { })

    }
  },
  created() {
    this.checkModal();
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
.board {
  margin: 10px;
  width: 100%;
}

.title {
  width: 100%;

  font-weight: bold;
  text-align: center;
}
</style>
