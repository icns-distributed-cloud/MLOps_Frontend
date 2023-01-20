<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div v-if="isLoading" class="loading">
            <Spinner />
      </div>
      <div v-if="!isLoading" class="modal-container">
        <div class="modal-header">
          <div class="title">전처리 데이터셋 등록</div>
        </div>
        <div class="modal-body">
          <div class="input">
            <div class="large-input">
              <label for="name">Dataset Name</label>
              <input
                type="text"
                id="name"
                autocomplete="off"
                v-model="name"
              />
            </div>
          </div>
          <div class="input">
            <div class="checkbox-input">
              <label for="isPublic">데이터를 공개합니다.</label>
              <input type="checkbox" id="isPublic" v-model="isPublic" :value="true"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="save-btn" @click="save">
            저장
          </button>
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["preDatasetId", "preProcessJson", "preProcessType", "datasetType"],
  components: {
    Spinner,
  },
  data() {
    return {
      name: "",
      isPublic: true,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("login", ["userId"]),
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
    ...mapActions("cleaning", ["SAVE"]),
    save() {
      this.isLoading = true;
      this.SAVE({
        preDatasetId: this.preDatasetId,
        name: this.name,
        isPublic: this.isPublic, 
        preProcessJson: this.preProcessJson, 
        preProcessType : this.preProcessType,
        datasetType: this.datasetType,
        userId: this.userId,
      }).then((res) => {
        console.log(res);
        this.isLoading = false;
        this.close(res.data);
      });
    },
    close(data) {
      this.$emit("close", {
        code: data.code,
        preDatasetId: data.preDatasetId,
      });
    },
  },
  created(){
  }
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
  width: 550px;
  height: 250px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
  position: relative;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.modal-body {
  padding: 10px 20px;
  font-size: 15px;
}
.input div {
  margin: 0px 13px;
}
.input label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  padding: 5px 0px;
}
.input {
  display: flex;
  margin-bottom: 3px;
  margin-left: 20px;
}
.input input {
  display: block;
  margin: auto;
  height: 18px;
  width: 120px;
  background-color: #1b1b1b;
  border: none;
  color: #e8e8e8;
  padding: 3px 0px;
  padding-left: 10px;
  outline: 1px #676767a6 solid;
}
.input select {
  background-color: #1b1b1b;
  color: #e8e8e8;
  width: 130px;
  height: 25px;
  padding: 0px 10px;
  border: none;
  outline: 1px #676767a6 solid;
}
.large-input input {
  width: 432px;
}
.checkbox-input {
  padding: 10px 0;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
}

.checkbox-input #isPublic {
  padding: 10px 10px;
  width: 25px;
  height: 25px;
}

.modal-footer {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0px 20px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  border-top: 0.2px #969696 solid;
  box-sizing: border-box;
  height: 50px;
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

.save-btn {
  background-color: #3f8ae2;
}
.save-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.input .required {
  outline: 1.5px #7e2020a6 solid;
}
</style>
