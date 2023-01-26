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
    preDatasetId, userId, name, modelName, parameter_json, isPublic, isUseGPU
  ) 
  {
    console.log({preDatasetId, userId, name, modelName, parameter_json, isPublic, isUseGPU});
    return axios.post("/api/model/post/createmodel", {
      preDatasetId, userId, name, modelName, parameter_json, isPublic, isUseGPU
    });
  },
  get_model_info(
    trainId
  ) 
  {
    return axios.post("/api/train/post/gettraininfo", {
      trainId
    });
  },
};

export default training;
