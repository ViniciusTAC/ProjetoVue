<template>
  <div id="app">
    <v-app>
      <h1>
        Quadro de atividades
      </h1>
      <div>
        <div class="add">

          <v-btn slot="activator" color="primary" @click="showDialog(true, idade)">
            Adicionar Atividades
          </v-btn>
          <Atividades :dialogs="dialogs" />
        </div>
      </div>
      <br>

      <v-container class="quadro">
        <v-row>
          <v-col>
            <v-card style="background-color: #ea6e6b; font-weight: bold;">BackLog</v-card>
            <v-col v-for="n in 10" :key="n" @click="showDialog(true, n)">{{ n }}

            </v-col>
            <v-col>5</v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #bd3dbd; font-weight: bold;">Priorizadas</v-card>

            <v-col v-for="n in 10" :key="n"><v-card style="padding:1%">{{ n }}</v-card></v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #7d7d7d; font-weight: bold;">A Fazer</v-card>

            <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #799fd4; font-weight: bold;">Fazendo</v-card>

            <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #e08d6f; font-weight: bold;">Revisando</v-card>

            <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #a6eca5; font-weight: bold;">Prontas</v-card>

            <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Atividades from './components/Atividades.vue';
export default {
  components: {
    Atividades,
  },
  data() {
    return {
      nome: '',
      idade: 0,
      dialogs: {
        dialog: false,
        id: 0,
      }
    }
  },
  methods: {
    getDados() {
      //const req = await fetch("http://localhost:300/ingredientes");
      //const data = await req.json();
      //console.log('teste1');


    },

    showDialog(verificacao, id) {
      this.dialogs.id = id
      this.dialogs.dialog = verificacao

    }
  },
  mounted() {
    this.getDados()
  },
}
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
  margin-right: 15px;
  float: right;
}</style>
