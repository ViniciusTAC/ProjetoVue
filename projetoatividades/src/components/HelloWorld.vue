<template>
  <v-container>
    <v-row>
      <v-col>
        BackLog
        <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
        <v-col>5</v-col>
      </v-col>
      <v-col>
        Priorizadas
        <v-col v-for="n in 10" :key="n"><v-card style="padding:1%">{{ n }}</v-card></v-col>
      </v-col>
      <v-col>
        A Fazer
        <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
      </v-col>
      <v-col>
        Fazendo
        <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
      </v-col>
      <v-col>
        Revisando
        <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
      </v-col>
      <v-col>
        Prontas
        <v-col v-for="n in 10" :key="n">{{ n }}</v-col>
      </v-col>
    </v-row>
    <v-row>

    </v-row>

  </v-container>
</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
