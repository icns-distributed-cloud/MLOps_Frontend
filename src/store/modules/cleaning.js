import cleaning from "@/api/cleaning";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  FIND_NA(context, { request }) {
    return cleaning.find(request).then((res) => {
      return res.data;
    });
  },
  RUN_NA(context, { method, idxCol, request }) {
    return cleaning
      .run(method, idxCol, request)
      .then((res) => {
        return res.data;
      });
  },
  PEARSON_CORRELATION(context, { request }) {
    return cleaning
      .pearsonCorrelation(request)
      .then((res) => {
        return res.data;
      });
  },
  STD(context, { request }) {
    return cleaning.std(request).then((res) => {
      return res.data;
    });
  },
  MEAN(context, { request }) {
    return cleaning.mean(request).then((res) => {
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
