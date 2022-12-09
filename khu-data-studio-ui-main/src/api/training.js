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
    item,
  ) {
    //return axios.post("/api/model/post/createmodel", {
      return axios.post("/api/model/post/createmodel", 
      item,
    );
  },
};

export default training;
