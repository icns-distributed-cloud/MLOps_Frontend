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
  saveWithCsv({ name, csv }) {
    let formData = new FormData();
    formData.append("csv", csv);
    let request = {
      name,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );
    return axios.post(
      "/dataset-api/datasets/csv",
      formData
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
    return axios.get("/dataset-api/datasets/" + datasetId);
  },
  getList() {
    return axios.get("/dataset-api/datasets");
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
  updateWithCsv({ datasetId, csv }) {
    let formData = new FormData();
    formData.append("csv", csv);

    return axios.put(
      "/dataset-api/datasets/" + datasetId + "/data/csv",
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
