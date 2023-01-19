import axios from "axios";

const cleaning = {
  find(request) {
    return axios.post(
      "/cleaning-api/missing-value/find",
      request
    );
  },
  run(method, idxCol, request) {
    return axios.post(
      "/cleaning-api/missing-value/run?method=" +
        method +
        "&idx_col=" +
        idxCol,
      request
    );
  },
  deleteMissingValue(request) {
    return axios.post(
      "/cleaning-api/missing-value/delete",
      request
    );
  },
  interpolate(request) {
    return axios.post(
      "/cleaning-api/missing-value/interpolate",
      request
    );
  },
  predict(request) {
    return axios.post(
      "/cleaning-api/missing-value/predict",
      request
    );
  },
  pearsonCorrelation(request) {
    return axios.post(
      "/cleaning-api/pearson-correlation",
      request
    );
  },
  std(request) {
    return axios.post("/cleaning-api/std", request);
  },
  mean(request) {
    return axios.post("/cleaning-api/mean", request);
  },
  visualize(request) {
    return axios.post("/cleaning-api/visualize", request);
  },
  denoise(request, com, datasetId) {
    return axios.post(
      "/cleaning-api/denoise?com=" +
        com +
        "&datasetId=" +
        datasetId,
      request
    );
  },
  save({preDatasetMasterId, name, isPublic, preProcessJson, preProcessType, datasetType, userId}){
    console.log({preDatasetMasterId, name, isPublic, preProcessJson, preProcessType, datasetType, userId});
    return axios.post("/api/predataset/post/createpre", {
      preDatasetMasterId, name, isPublic, preProcessJson, preProcessType, userId
    });
  }
};

export default cleaning;
