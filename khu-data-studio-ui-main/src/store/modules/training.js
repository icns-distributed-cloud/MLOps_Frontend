import training from "@/api/training";

const state = {
  running_model_infos: [],
};

const getters = {
  getRunningModelinfos(state) {
    return state.running_model_infos;
  },
};

const mutations = {
  SET_RUNNING_MODELINFOS(state, payload) {
    state.running_model_infos = payload;
  },
};

const actions = {
  FETCH_RUNNING_MODELINFOS(context, userId) {
    return training.get_running_model_list(userId).then((res) => {
      console.log(res.data.data);
      context.commit("SET_RUNNING_MODELINFOS", res.data.data);
    });
  },
  RUN_MODEL(
    context, item,
  ) {
    return training
      .run(item)
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
