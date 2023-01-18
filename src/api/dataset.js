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
  get(datasetId) {
    return axios.post(
      "/dataset-api/datasets/",
      datasetId
      );
  },
  getList(userId) {
    return axios.post(
      "/api/origindataset/post/getoriginlist",
      {userId}
      );
  },
  GetPreList(originDatasetMasterId){
    return axios.post(
      "/api/predataset/post/getprelist",
      {originDatasetMasterId}
    );
  },
  update({ originDatasetMasterId, name }) {
    return axios.post("/api/origindataset/post/updateoriginname", {
      originDatasetMasterId,
      name,
    });
  },
  preUpdate({ preDatasetMasterId, name }) {
    return axios.post("/api/predataset/post/updateprename", {
      preDatasetMasterId,
      name,
    });
  },
  delete({ originDatasetMasterId }) {
    return axios.post("/api/origindataset/post/deleteorigin",{
      originDatasetMasterId
    });
  },
  Predelete({preDatasetMasterId}){
    return axios.post("/api/predataset/post/deletepre",{
      preDatasetMasterId
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
  getPreviewData({ preDatasetMasterId }) {
    return axios.post(
      "/api/predataset/post/getonepre",{
        preDatasetMasterId
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
    console.log({userId, originDatasetId, name});
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
