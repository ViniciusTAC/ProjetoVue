import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: colors.grey.darken4, // ##212121
          secondary: colors.brown.darken4, // #3E2723
          accent: colors.indigo.base, // #3F51B5
          error: colors.red.darken1, // #E53935
          sucess: colors.green, // #4CAF50
          exit: colors.red.darken4, // #D50000
        },
      },
    },
  })
