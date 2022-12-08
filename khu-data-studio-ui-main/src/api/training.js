import axios from "axios";

const training = {
  get_running_model_list(
    userId,
  ){
    return axios.pose("/api/model/post/getmodellist", {
      userId,
    });
  },
  run(item) {
    //return axios.post("/api/model/post/createmodel", {
      return axios.post("/training-api/runmodel", item);
  },
};

export default training;
