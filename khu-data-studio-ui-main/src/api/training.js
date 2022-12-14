import axios from "axios";

const training = {
  get_running_model_list(
    userId,
  ){
    return axios.post("/api/model/post/getmodellist", {
      userId,
    });
  },
  run(
    preDatasetId, userId, name, parameter_json, isPublic, isUseGPU
  ) {
      return axios.post("/api/model/post/createmodel", {
      preDatasetId, userId, name, parameter_json, isPublic, isUseGPU
      });
  },
};

export default training;
