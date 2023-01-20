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
  FETCH_DATASETS(context, {userId}) {
    return dataset.getList(userId).then((res) => {
      context.commit("SET_DATASETS", res.data);
    });
  },
  FETCH_PREDATASETS(context, {originDatasetId}) {
    return dataset.GetPreList({
      originDatasetId})
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATASET(context,{ originDatasetId ,name }
  ) {
    return dataset
      .update({ originDatasetId, name })
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_PREDATASET(context,{ preDatasetId ,name }
    ) {
      return dataset
        .preUpdate({ preDatasetId, name })
        .then((res) => {
          return res.data;
        });
    },
  DELETE_DATASET(context, { originDatasetId }) {
    return dataset.delete({
      originDatasetId,
    }).then((res) => {
      if (res.data.success) {alert("데이터셋이 삭제되었습니다.");}
      else {alert("데이터셋 삭제에 실패하였습니다.");}
      return res;
    });
  },
  DELETE_PREDATASET(context, { originDatasetId }) {
    return dataset.delete({
      originDatasetId,
    }).then((res) => {
      if (res.data.success) {alert("데이터셋이 삭제되었습니다.");}
      else{alert("데이터셋 삭제에 실패하였습니다.")}
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
  FETCH_DATA(context, { PredatasetId, limit }) {
    return dataset.getData(PredatasetId, limit).then((res) => {
      return res.data;
    });
  },
  FETCH_COLUMN(context, { datasetId }) {
    return dataset.getData(datasetId).then((res) => {
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
  UPDATE_DATASET_WITH_CSV(context, {
    userId, originDatasetId, name
  }) {
    return dataset
      .updateWithCsv({userId, originDatasetId, name})
      .then((res) => {
         return res.data;
      });
  },
  CREATE_PREVIEW_DATA(context, {
    originDatasetMasterId, preDatasetId, name, isPulbic, preProcessJson, preProcessType, userId 
  }) {
    return dataset
      .createPreviewData({
        originDatasetMasterId, preDatasetId, name, isPulbic, preProcessJson, preProcessType, userId 
      })
      .then((res) => {
         return res.data;
      });
  },
  PREVIEW_DATA(context, {
    preDatasetId
  }) {
    return dataset
      .getPreviewData({
        preDatasetId
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
