import axios from "axios";

const login = {
  login({
    loginId,
    password
  }){
    console.log({loginId, password})    
    return axios.post("/api/users/post/login", {
      loginId, password
    });
  },
};

export default login;
