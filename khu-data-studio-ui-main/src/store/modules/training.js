import training from "@/api/training";

const state = {
  model_infos: [],
};

const getters = {
  getModelinfos(state) {
    return state.model_infos;
  },
};

const mutations = {
  SET_MODELINFOS(state, payload) {
    state.model_infos = payload;
  },
};

const actions = {
  FETCH_MODELINFOS(context) {
    return training.getList().then((res) => {
      console.log(res.data.message)
      console.log(res.data.code)
      context.commit("SET_MODELINFOS", res.data.data);
    });
  },
  RUN_MODEL(
    context,
    {
      item,
    }
  ) {
    return training
      .run({
        item,
      })
      .then((res) => {
        return res.data;
      });
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
