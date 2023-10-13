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
            <v-card style="background-color: #ea6e6b;" class="titulo">BackLog</v-card>

            <v-col @click="showDialog(true, n)">
              <v-card class="card">{{ titulo }} <br> {{ descricao }} </v-card>
            </v-col>
            <v-col v-for="n in 10" :key="n" @click="showDialog(true, n)"><v-card class="card">{{ n }} <br> {{ n }}
              </v-card>

            </v-col>

          </v-col>
          <v-col>
            <v-card style="background-color: #bd3dbd;" class="titulo">Priorizadas</v-card>

            <v-col v-for="n in 10" :key="n"><v-card><v-card class="card">{{ n }} <br> {{ n }} </v-card></v-card></v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #7d7d7d;" class="titulo">A Fazer</v-card>

            <v-col v-for="n in 10" :key="n"><v-card class="card">{{ n }} <br> {{ n }} </v-card></v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #799fd4;" class="titulo">Fazendo</v-card>

            <v-col v-for="n in 10" :key="n"><v-card class="card">{{ n }} <br> {{ n }} </v-card></v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #e08d6f;" class="titulo">Revisando</v-card>

            <v-col v-for="n in 10" :key="n"><v-card class="card">{{ n }} <br> {{ n }} </v-card></v-col>
          </v-col>
          <v-col>
            <v-card style="background-color: #a6eca5;" class="titulo">Prontas</v-card>

            <v-col v-for="n in 10" :key="n"><v-card class="card">{{ n }} <br> {{ n }} </v-card></v-col>
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
      titulo: 'Título: Teste 10-12-2023',
      descricao: "Descrição: Lorem ipsum dolor sit amet. Rem blanditiis voluptas sed saepe placeat At unde fugit non odit enim et deleniti unde.",
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
    formataTexto() {
      if (this.descricao.length > 30) {
        this.descricao = this.descricao.slice(0, 75)
        this.descricao = this.descricao + '...'
      }

    },
    showDialog(verificacao, id) {
      this.dialogs.id = id
      this.dialogs.dialog = verificacao

    }
  },
  mounted() {
    this.formataTexto();
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
