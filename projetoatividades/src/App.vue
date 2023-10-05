<template>
  <v-app>
    <v-app-bar app color="#3E3E96" dark>
      <div class="d-flex align-center">
        <v-img alt="Logo" class="shrink mr-2" contain src="./assets/lista-de-afazeres.png" transition="scale-transition"
          width="40" />

        <span class="mr-2">Projeto Quadro de Atividades</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="./Teste.vue" target="_blank" text>
        <span class="mr-2">Adicionar Atividade</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld, 
  },

  data: () => ({
    //
  }),
};
</script>
