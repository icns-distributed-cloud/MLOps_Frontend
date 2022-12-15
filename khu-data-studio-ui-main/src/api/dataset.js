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
    console.log({csv});
    var file = new FormData();
    file.append("file", csv);
    console.log("/api/dataset/post/createorigin", {file: csv});
    return axios.post(
      "/api/dataset/post/createorigin", file
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
      "/api/dataset/post/getorigindatasetlist",
      {userId}
      );
  },
  update({ datasetId, name }) {
    return axios.put("/dataset-api/datasets/" + datasetId, {
      name,
    });
  },
  delete(datasetId) {
    return axios.delete(
      "/dataset-api/datasets/" + datasetId
    );
  },
  previewData({ datasetId }) {
    return axios.get(
      "/dataset-api/datasets/" + datasetId + "/data/preview"
    );
  },
  getData(datasetId, st, et) {
    return axios.get(
      "/dataset-api/datasets/" +
        datasetId +
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

  updateData({ datasetId, data }) {
    return axios.put(
      "/dataset-api/datasets/" + datasetId + "/data",
      data
    );
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
