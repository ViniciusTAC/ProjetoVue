<template>
  <div id="app">
    <v-app>
      <h1 style="color: black;">Quadro de atividades</h1>
      <div>
        <div class="add">
          <v-btn color="primary" @click="showModal('criar_atividade')">
            Adicionar Atividade
          </v-btn>
          <Atividades :open="open" @close="open = false">
          </Atividades>
        </div>
      </div>
      <Titulo />
    </v-app>
  </div>
</template>

<script>
import Atividades from "./components/Atividades.vue";
import Titulo from "./components/Titulo.vue";
export default {
  components: {
    Atividades,
    Titulo,
  },
  data() {
    return {
      dialog: {
        aberto: false,
        id: 0,
      },

      open: false,
      modalContents: {
        criar_atividade: {
        }
      },
    };
  },
  methods: {
    checkModal() {
      if (this.$route.params.modal && this.modalContents[this.$route.params.modal]) {
        this.open = true;
        this.currentModal = this.$route.params.modal
      } else {
        this.open = false;
      }
    },
    showModal(name) {
      this.$router.push(name).catch(() => { })
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
        if (this.$route.params.modal) {
          this.$router.push('/')
        }
      }
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #344250;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.quadro {
  max-width: 2000px !important;
  width: 150%;
}

.add {
  margin-left: 15px;
  float: left;
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
