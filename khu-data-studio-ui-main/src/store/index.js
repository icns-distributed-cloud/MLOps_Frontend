import Vue from "vue";
import Vuex from "vuex";
import dataset from "./modules/dataset";
import cleaning from "./modules/cleaning";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dataset,
    cleaning,
  },
});

export default store;
