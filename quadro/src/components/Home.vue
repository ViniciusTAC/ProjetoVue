<template>
  <div id="app">
    <v-app>
      <h1 style="color: black;">Quadro de atividades</h1>
      <div>
        <div class="add">
          <v-btn color="primary" @click="adicionaRota()">
            Adicionar Atividade
          </v-btn>
          <Atividade :aberto="aberto" @close="aberto = false" />
        </div>
      </div>
      <Coluna />
    </v-app>
  </div>
</template>

<script>
import Atividade from "./Atividade.vue";
import Coluna from "./Coluna.vue";
export default {
  components: {
    Atividade,
    Coluna,
  },
  data() {
    return {
      aberto: false,
    };
  },
  methods: {
    verificaModal() {
      //console.log(this.$route)
      // if (this.$route.name == 'home') {
      //   this.aberto = true;
      //   console.log('home')
      // }
      if (this.$route.name == 'CriarAtividade' || this.$route.name == 'EditarAtividade') {
        // console.log('verificaModal if')
        this.aberto = true;
      } else {
        // console.log('verificaModal else')
        this.aberto = false;
      }

    },
    adicionaRota() {
      this.$router.push({
        name: 'CriarAtividade'
      }).catch(() => { })

    }
  },
  created() {
    this.verificaModal();
  },
  mounted() {

  },
  watch: {
    $route(to, from) {
      //console.log('watch')
      if (this.$route.name == 'CriarAtividade') {
        // console.log('watch if')
        this.verificaModal();
      }
      else {
        // console.log('watch else')
        this.verificaModal();
      }
    },
    aberto(to, from) {

      if (from || to == false) {
        console.log('from')
      }
      if (to == false) {
        // console.log('watch aberto if')
        this.$router.push('/').catch(() => { })
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



<!-- <template>
  <div class="home">
    <button @click="adicionaRota('info')">Info</button>
    <button @click="adicionaRota('success')">Success</button>
    <v-modal :open="open" @close="open = false">
      <template slot="title" v-if="open">{{modalContents[currentModal].title}}</template>
      <template slot="content" v-if="open">{{modalContents[currentModal].content}}</template>
    </v-modal>
  </div>
</template>

<script>
  import vModal from '../components/Atividades.vue'

  export default {
    data() {
      return {
        open: true,
        modalContents: {
          info: {
            title: 'This Is Information',
            content: 'Info To Be Passed to The User'
          },
          success: {
            title: 'Success!',
            content: 'Request Completed'
          }
        },
        currentModal: 'info'
      }
    },
    components: {
      vModal
    },
    created() {
      this.verificaModal();
    },
    watch: {
      $route(to,from) {
        this.verificaModal();
      },
      open(to,from) {
        if (to == false) {
          if (this.$route.params.modal) {
            this.$router.push('/')
          }
        }
      }
    },
    methods: {
      verificaModal() {
        if (this.$route.params.modal && this.modalContents[this.$route.params.modal]) {
          this.open = true;
          this.currentModal = this.$route.params.modal
        } else {
          this.open = false;
        }
      },
      adicionaRota(name) {
        this.$router.push(name).catch(()=>{})
      }
    }
  }
</script> -->
