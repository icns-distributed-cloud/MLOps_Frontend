import login from "@/api/login";

const state = {
  Id: 1,
};

const getters = {
  userId(state){
    return state.Id;
  }
};

const mutations = {
  SET_USERID(state, payload) {
    state.Id = payload;
  },
};

const actions = {
  LOGIN(context, {loginId, password}) {
    return login.login({
      loginId, password
    }).then((res) => {
      console.log(res)
      if(res.data.success){
        if(res.data.data.userId>0){
          context.commit("SET_USERID", res.data.data.userId);
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
