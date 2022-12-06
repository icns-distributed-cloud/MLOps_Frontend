import axios from "axios";

const training = {
  get() {
    return axios.get("/training-api/modelinfo/");
  },
  getList() {
    return axios.get("/training-api/modelinfo");
  },
  run({
    item,
  }) {
    return axios.post("/training-api/runmodel", {
      item,
    });
  },
};

export default training;
