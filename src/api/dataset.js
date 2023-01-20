import axios from "axios";

const dataset = {
  saveWithDatabase({
    name,
    host,
    port,
    db,
    username,
    password,
    table,
  }) {
    return axios.post("/dataset-api/datasets/database", {
      name,
      host,
      port,
      db,
      username,
      password,
      table,
    });
  },
  saveWithCsv(csv) {
    var file = new FormData();
    file.append("file", csv);
    return axios.post(
      "/api/origindataset/post/createorigin", file
    );
  },
  previewWithDatabase({
    host,
    port,
    db,
    username,
    password,
    table,
  }) {
    return axios.post(
      "/dataset-api/datasets/preview/database",
      {
        host,
        port,
        db,
        username,
        password,
        table,
      }
    );
  },
  previewWithCsv({ csv }) {
    let formData = new FormData();
    formData.append("csv", csv);
    return axios.post(
      "/dataset-api/datasets/preview/csv",
      formData
    );
  },
  getList(userId) {
    return axios.post(
      "/api/origindataset/post/getoriginlist",
      {userId}
      );
  },
  GetPreList({originDatasetId}){
    return axios.post(
      "/api/predataset/post/getprelist",
      {originDatasetId}
    );
  },
  update({ originDatasetId, name }) {
    return axios.post("/api/origindataset/post/updateoriginname", {
      originDatasetId,
      name,
    });
  },
  preUpdate({ preDatasetId, name }) {
    return axios.post("/api/predataset/post/updateprename", {
      preDatasetId,
      name,
    });
  },
  delete({ originDatasetId }) {
    return axios.post("/api/origindataset/post/deleteorigin",{
      originDatasetId
    });
  },
  Predelete({preDatasetId}){
    return axios.post("/api/predataset/post/deletepre",{
      preDatasetId
    });
  },
  createPreviewData({ 
    originDatasetMasterId, preDatasetMasterId, name, isPulbic, preProcessJson, preProcessType, userId 
  }){
    return axios.post(
      "/api/predataset/post/createminipre",{
        originDatasetMasterId, preDatasetMasterId, name, isPulbic, preProcessJson, preProcessType, userId
      }
    );
  },
  getPreviewData({ preDatasetId }) {
    return axios.post(
      "/api/predataset/post/getonepre",{
        preDatasetId
      }
    );
  },
  getData(PredatasetId, st, et) {
    return axios.get(
      "/dataset-api/datasets/" +
      PredatasetId +
        "/data?st=" +
        st +
        "&et=" +
        et
    );
  },
  updateWithDatabase({
    datasetId,
    host,
    port,
    db,
    username,
    password,
    table,
  }) {
    return axios.put(
      "/dataset-api/datasets/" +
        datasetId +
        "/data/database",
      {
        host,
        port,
        db,
        username,
        password,
        table,
      }
    );
  },
  updateWithCsv({
    userId, originDatasetId, name
  }) {
    return axios.post(
      "/api/origindataset/post/updateoriginstatus",{
        userId, originDatasetId, name
      });
  },
  deleteDataByDate({ datasetId, dateList }) {
    return axios.delete(
      "/dataset-api/datasets/" + datasetId + "/data",
      {
        data: dateList,
      }
    );
  },

  saveHistory({ datasetId, request }) {
    return axios.post(
      "/dataset-api/datasets/" + datasetId + "/history",
      request
    );
  },
  getHistory() {
    return axios.get("/dataset-api/datasets/history");
  },
  getHistoryByDatasetId({ datasetId }) {
    return axios.get(
      "/dataset-api/datasets/" + datasetId + "/history"
    );
  },
};

export default dataset;
