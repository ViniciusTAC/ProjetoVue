<template>
  <div id="app">
    <v-app>
      <h1>
        Quadro de atividades
      </h1>
      <div>
        <div class="add">
          <v-btn slot="activator" color="primary" @click="abrirDialog(true, dialog.id)">
            Adicionar Atividades
          </v-btn>
          <Atividades :dialog="dialog" />
        </div>
      </div>
      <br>

      <v-container class="quadro">
        <v-row>
          <v-col v-for="(items, index) in status" :key="index">
            <v-card v-bind:color="items.color" class="titulo">{{ items.tipo }}</v-card>
            <v-col v-for="(item, index) in atividades" :key="index" v-if="items.idStatus == item.idStatus"
              @click="abrirDialog(true, item.id)">
              <v-card class="card">
                Título: {{ item.titulo }} <br>Descrição: {{
                  item.descricao }}
              </v-card>
            </v-col>
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
      status: [
      ],
      atividades: [
      ],
      dialog: {
        aberto: false,
        id: 0,
      }
    }
  },
  methods: {
    async getDados() {

      const req = await fetch(" http://localhost:3000/status");
      const status = await req.json();
      this.status = status

      const reqs = await fetch("  http://localhost:3000/atividades");
      const atividades = await reqs.json();
      this.atividades = atividades

      this.formataTexto();

    },
    formataTexto() {
      for (let index = 0; index < this.atividades.length; index++) {
        if (this.atividades[index].descricao.length > 60) {
          this.atividades[index].descricao = this.atividades[index].descricao.slice(0, 64)
          this.atividades[index].descricao = this.atividades[index].descricao + '...'
        }
      }

    },
    abrirDialog(verificacao, id) {
      this.dialog.id = id
      this.dialog.aberto = verificacao

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
