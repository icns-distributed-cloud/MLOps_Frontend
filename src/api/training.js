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
    preDatasetId, userId, name, modelName, parameterJson, isPublic, isUseGPU
  ) 
  {
    return axios.post("/api/model/post/createmodel", {
      preDatasetId, userId, name, modelName, parameterJson, isPublic, isUseGPU
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
  delete_model(
    modelId
  ) 
  {
    return axios.post("/api/model/post/deletemodel", {
      modelId
    });
  },
};

export default training;
