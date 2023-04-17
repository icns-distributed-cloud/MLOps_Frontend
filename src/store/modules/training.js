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
  FETCH_RUNNING_MODELINFOS(context, {userId}) {
    return training.get_running_model_list(userId).then((res) => {
      context.commit("SET_RUNNING_MODELINFOS", res.data.data);
    });
  },
  RUN_MODEL(context, {preDatasetId, userId, name, modelName, parameterJson, isPublic, isUseGPU}) {
    return training
      .run(preDatasetId, userId, name, modelName, parameterJson, isPublic, isUseGPU)
      .then((res) => {
        return res.data;
      });
  },
  GET_MODEL_INFO(context, {trainId}) {
    return training
      .get_model_info(trainId)
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
