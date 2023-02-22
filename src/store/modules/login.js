import login from "@/api/login";

const state = {
  Id: 1,
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

  /* 로그인을 사용하지 않을 때, 
  만약 DB를 초기화 한다면 계정이 하나도 없기 때문에 초기 계정 하나 생성 */
  DUMMY_LOGIN(){
    return login.dummy_login()
      .then((res) => {
        if(res.data.success){
          console.log("dummy_login success");
        }
        else{
          console.log("dummy_login fail");
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
