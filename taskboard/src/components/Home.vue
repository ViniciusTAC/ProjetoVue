<template>
  <div class="board">
    <h1 class="title">
      Quadro de Atividades
    </h1>
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
      //console.log('checkModal open:',this.open)
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

      
      //console.log("teste")
      this.checkModal();
      // if (this.$route.name == 'CriarAtividade') {
      //   this.checkModal();
      // }
      // else {
      //   this.checkModal();
      // }
    },
    open(to, from) {
      // if (from || to == false) {
      //   console.log('from')
      // }
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
  text-align: center;
}
</style>
