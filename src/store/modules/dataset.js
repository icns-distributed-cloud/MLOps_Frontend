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
  FETCH_PREDATASETS(context, {originDatasetMasterId}) {
    return dataset.GetPreList(originDatasetMasterId)
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATASET(context,{ originDatasetMasterId ,name }
  ) {
    console.log({originDatasetMasterId, name});
    return dataset
      .update({ originDatasetMasterId, name })
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_PREDATASET(context,{ preDatasetMasterId ,name }
    ) {
      console.log({preDatasetMasterId, name});
      return dataset
        .preUpdate({ preDatasetMasterId, name })
        .then((res) => {
          return res.data;
        });
    },
  DELETE_DATASET(context, { originDatasetMasterId }) {
    return dataset.delete({
      originDatasetMasterId,
    }).then((res) => {
      console.log(res.data);
      if (res.data.success) {alert("데이터셋이 삭제되었습니다.");}
      else {alert("데이터셋 삭제에 실패하였습니다.");}
      return res;
    });
  },
  DELETE_PREDATASET(context, { preDatasetMasterId }) {
    return dataset.delete({
      preDatasetMasterId,
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
    originDatasetMasterId, preDatasetMasterId, name, isPulbic, preProcessJson, preProcessType, userId 
  }) {
    return dataset
      .createPreviewData({
        originDatasetMasterId, preDatasetMasterId, name, isPulbic, preProcessJson, preProcessType, userId 
      })
      .then((res) => {
         return res.data;
      });
  },
  PREVIEW_DATA(context, {
    preDatasetMasterId
  }) {
    return dataset
      .getPreviewData({
        preDatasetMasterId
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
