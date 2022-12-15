import dataset from "@/api/dataset";

const state = {
  datasets: [],
};

const getters = {
  getDatasets(state) {
    return state.datasets;
  },
};

const mutations = {
  SET_DATASETS(state, payload) {
    state.datasets = payload.data;
  },
};

const actions = {
  SAVE_DATASET(
    context,
    {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    }
  ) {
    return dataset
      .save({
        name,
        host,
        port,
        db,
        userName,
        password,
        tableName,
        dateTimeColumn,
      })
      .then((res) => {
        return res.data;
      });
  },
  FETCH_DATASET(context, datasetId) {
    return dataset.get(datasetId).then((res) => {
      return res.data;
    });
  },
  FETCH_DATASETS(context, {userId}) {
    return dataset.getList(userId).then((res) => {
      context.commit("SET_DATASETS", res.data);
    });
  },
  UPDATE_DATASET(
    context,
    {
      userId,
      originDatasetId,
      name
    }
  ) {
    return dataset
      .update({
        userId,
        originDatasetId,
        name
      })
      .then((res) => {
        return res.data;
      });
  },
  DELETE_DATASET(context, { datasetId }) {
    return dataset.delete(datasetId).then((res) => {
      return res;
    });
  },
  CONNECT(
    context,
    { host, port, db, userName, password, tableName }
  ) {
    return dataset
      .connect({
        host,
        port,
        db,
        userName,
        password,
        tableName,
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {});
  },
  FETCH_DATA(context, { datasetId, limit }) {
    return dataset.getData(datasetId, limit).then((res) => {
      return res.data;
    });
  },
  FETCH_COLUMN(context, { datasetId }) {
    return dataset.getData(datasetId).then((res) => {
      return res.data;
    });
  },
  UPDATE_DATA(context, { datasetId, request }) {
    return dataset
      .updateData(datasetId, request)
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATA_WITH_DATABASE(
    context,
    { datasetId, host, port, db, username, password, table }
  ) {
    return dataset
      .updateWithDatabase({
        datasetId,
        host,
        port,
        db,
        username,
        password,
        table,
      })
      .then((res) => {
        return res.data;
      });
  },
  SAVE_DATASET_WITH_CSV(context, {
    csv
  }) {
    return dataset
      .saveWithCsv(csv)
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
