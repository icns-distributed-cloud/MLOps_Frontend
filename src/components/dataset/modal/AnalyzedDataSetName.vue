<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">분석용 데이터셋 이름입력</div>
        </div>
        <div class="modal-body">
          <div class="input">
            <label for="name">Dataset Name</label>
            <input
              type="text"
              id="name"
              autocomplete="off"
              v-model="name"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="update-btn" @click="close_withName">
            저장
          </button>
          <button class="close-btn" @click="close_NoName">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["predatasetId"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "UPDATE_DATASET",
      "UPDATE_PREDATASET",
    ]),
    close_NoName() {
      this.$emit("close");
    },
    close_withName() {
      var csv_check = "";
      if (this.name === ""){
        alert("정확한 이름을 입력해주세요");
      } 
      else{
        csv_check = this.name.split('.')
        if(csv_check[csv_check.length - 1] != "csv"){
          this.name+=".csv";
        }
        this.$emit("save", this.name);
      }
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
  width: 60px;
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

.update-btn {
  background-color: #3f8ae2;
}
.update-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
