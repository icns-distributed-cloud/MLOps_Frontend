import login from "@/api/login";

const state = {
  Id: 0,
  UserName: "",
};

const getters = {
  userId(state){
    return state.Id;
  },
  userName(state){
    return state.UserName;
  }
};

const mutations = {
  SET_USERID(state, payload) {
    state.Id = payload;
  },
  SET_LOGINID(state, payload){
    state.UserName = payload;
  }
};

const actions = {
  LOGIN(context, {loginId, loginPassword}) {
    return login.login({
      loginId, loginPassword
    }).then((res) => {
      if(res.data.success){
        if(res.data.data.userId>0){
          context.commit("SET_USERID", res.data.data.userId);
          context.commit("SET_LOGINID", loginId);
          return res.data.data;
        }
        else{
          alert("회원정보가 존재하지 않습니다.");
        }
      }
      else{
        alert("로그인에 실패하였습니다.");
      }
    });
  },
  REGISTRATION(context, {loginId, loginPassword, name, eMail, phoneNumber}){
    return login.registration({
      loginId, loginPassword, name, eMail, phoneNumber
    }).then((res) => {
      if(res.data.success){
        alert(res.data.message);
      }
      else{
        alert("회원가입에 실패하였습니다.");
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
