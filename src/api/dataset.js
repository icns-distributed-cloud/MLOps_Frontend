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
      "/api/origindataset/post/getorigindatasetlist",
      {userId}
      );
  },
  GetPreList(originDatasetMasterId){
    console.log({originDatasetMasterId})
    return axios.post(
      "/api/predataset/post/getpredatasetlist",
      {originDatasetMasterId}
    );
  },
  update({ userId, originDatasetId, name }) {
    return axios.post("/api/origindataset/post/updateorigin", {
      userId,
      originDatasetId,
      name,
    });
  },
  delete({ originDatasetMasterId }) {
    return axios.post("/api/origindataset/post/deleteorigin",{
      originDatasetMasterId
    });
  },
  previewData({ datasetId }) {
    return axios.get(
      "/dataset-api/datasets/" + datasetId + "/data/preview"
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
  updateWithCsv(csv) {
    let formData = new FormData();
    formData.append("csv", csv);

    return axios.post(
      "/dataset-api/datasets/data/csv",
      formData
    );
  },

  updateData( preDatasetMasterId, name, isPublic, preProcessJson, loginId ) {
    return axios.post(
      "/api/predataset/post/createpre",{
        preDatasetMasterId, name, isPublic, preProcessJson, loginId
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
