import axios from "axios";

const login = {
  login({
    loginId,
    loginPassword
  }){
    console.log({loginId, loginPassword})    
    return axios.post("/api/users/post/login", {
      loginId, loginPassword
    });
  },
  registration({
    loginId, loginPassword, name, eMail, phoneNumber
  }){
    return axios.post("/api/users/post/register", {
      loginId, loginPassword, name, eMail, phoneNumber
    });
  },
};

export default login;
