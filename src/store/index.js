import Vue from "vue";
import Vuex from "vuex";
import dataset from "./modules/dataset";
import cleaning from "./modules/cleaning";
import training from "./modules/training";
import login from "./modules/login";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: 0,
    baseURL: "http://data.icnslab.net",
    modelUSE: "http://back.api:8000"
  },
  modules: {
    dataset,
    cleaning,
    training,
    login,
  },
});

export default store;
