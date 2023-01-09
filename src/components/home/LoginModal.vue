<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">로그인</div>
        </div>
        <div class="modal-body">
          <div class="input">
            <label for="ID">ID</label>
            <input
              type="text"
              id="ID"
              autocomplete="off"
              v-model="loginId"
            />
          </div>
          <div class="input">
            <label for="PW">PW</label>
            <input
              type="text"
              id="PW"
              autocomplete="off"
              v-model="password"
            />
          </div>
          
        </div>
        <div class="modal-footer">
          <button class="registration-btn" @click="Registration">
            회원가입
          </button>
          <button class="login-btn" @click="Login">
            로그인
          </button>
        </div>
      </div>
    </div>
    <RegistrationModal v-if="RegistrationModal_flag" @close="RegistrationModal_close" />
  </div>
</template>

<script>
import RegistrationModal from "@/components/home/RegistrationModal";
import { mapActions } from "vuex";
export default {
  components:{
    RegistrationModal,
  },
  data() {
    return {
      loginId: "",
      password: "",
      RegistrationModal_flag: false,
    };
  },
  methods: {
    ...mapActions("login", [
      "LOGIN",
    ]),
    Login() {
      this.LOGIN({
        loginId: this.loginId,
        loginPassword: this.password,
      }).then((res) => {
        if (res.userId>0){
          this.$emit("close");
          this.ToDataManage();
        }
      });
    },
    Registration(){
      console.log("회원가입", this.ID, this.PW);
      this.RegistrationModal_flag=true;
    },
    RegistrationModal_close(){
      this.RegistrationModal_flag=false;
    },
    ToDataManage() {
      // object
      this.$router.push({ path: 'dataset/manage' })
    },
    
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.description {
  font-size: 15px;
  color: #e8e8e8c2;
  font-weight: 300;
}

.modal-body {
  padding: 10px 20px;
  font-size: 15px;
}

.modal-body label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  margin: 3px;
  padding-left: 35px;
}
.input {
  margin: 10px 0;
}

input {
  display: block;
  margin: auto;
  height: 18px;
  width: 75%;
  background-color: #1f1f1f;
  border: none;
  color: #e8e8e8;
  padding: 3px 20px;
  outline: 1px #676767a6 solid;
}

.modal-footer {
  display: flex;
  justify-content: right;
  padding: 15px 20px;
  border-top: 0.2px #969696 solid;
}

.modal-footer button {
  height: 30px;
  font-size: 17px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.login-btn {
  background-color: #3f8ae2;
}
.login-btn:hover {
  background-color: #2f6cb1;
}

.login-btn {
  background-color: #3f8ae2;
}
.login-btn:hover {
  background-color: #2f6cb1;
}
.registration-btn {
  background-color: #373737;
}
.registration-btn:hover {
  background-color: #464646;
}
</style>
