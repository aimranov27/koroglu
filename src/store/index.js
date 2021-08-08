import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import campaignModule from "./CampaignModule/campaignModule";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        campaignModule,
    },
});