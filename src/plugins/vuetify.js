import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";



Vue.use(Vuetify, {
  theme: {
    primary: "#119cc3",
      secondary: "#f3f3f3",
      accent: "#2196F3",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107"
  }

  ,
  customProperties: true,
  iconfont: "md"
}

);