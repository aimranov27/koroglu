import Vue from 'vue'
import vuetify from "./plugins/vuetify";
import App from './App.vue'
import axios from "axios";
import moment from "moment";
import endpoint from "./utils/endpoint";
import router from "./router";
import store from "./store/index";
import mapboxgl from 'mapbox-gl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$endpoint = endpoint;
Vue.prototype.$moment = moment;
Vue.prototype.$store = store;
Vue.prototype.$mapboxgl = mapboxgl;
// eslint-disable-next-line no-undef
Vue.prototype.$ymaps = ymaps;

mapboxgl.accessToken = "pk.eyJ1IjoiYWtoYXlydWxsaW4iLCJhIjoiY2tyaHR3YWFsMGNiZDJxcHYwYnl5bDFneiJ9.7qCD07HUP-G1yN7y_2Oekw";


new Vue({
    router,
    vuetify,
  render: h => h(App),
}).$mount('#app')
