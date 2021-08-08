import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken1,
        secondary: colors.grey.darken2,
        accent: colors.blueGrey.darken1,
        error: "#FF0C3E",
        info: "#2196F3",
        success: "#5C941C",
        warning: "#FFC107",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
