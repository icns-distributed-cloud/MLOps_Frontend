<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">새 모델 생성</div>
          <div class="description">
            새로 학습시킬 모델의 정보를 입력해주세요.
          </div>
        </div>
        <div class="modal-body">
          <div class="body-head">
            <div class="name-input">
              <input :value="model_name"/>
            </div>
            <div class="model-select">
              <select v-model="selected_model" @change="onChange(selected_model)">
                <option 
                v-for="(model, index) in model_templates"
                :key="index"
                :value="model">
                  {{model.name}}
                </option>
              </select>
            </div>
          </div>
          <div class="body-table">
            <table>
              <thead>
                <th>하이퍼파라미터</th>
                <th>값 입력</th>
                <th>설명</th>
              </thead>
              <tbody>
                <tr v-for="(param, index) in selected_model.hyperparams"
                :key="index">
                  <td >{{param.param_name}}</td>
                  <td><input :value="param.val"/></td>
                  <td>{{param.description}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapActions } from "vuex";
export default {
  data() {
    return {
      model_name: "모델의 이름을 입력해주세요.",
      selected_model:[],
      model_templates:[
        {
          name: "LSTM",
          hyperparams: [
            {
              param_name: "Epoch",
              val: 10,
              description: "Number of iterations",
            },
            {
              param_name: "Dropout",
              val: 20,
              description: "Avoid overfitting in training by bypassing randomly selected neurons",
            },
            {
              param_name: "LearningRate",
              val: 123,
              description: "How quickly the network updates its parameters",
            },
          ],
        },
        {
          name: "ARIMA",
          hyperparams: [
            {
              param_name: "Epoch",
              val: 10,
              description: "Number of iterations",
            },
            {
              param_name: "Dropout",
              val: 20,
              description: "Avoid overfitting in training by bypassing randomly selected neurons",
            },
            {
              param_name: "BatchSize",
              val: 32,
              description: "The number of samples to work",
            },
          ],
        },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onChange(value){
      console.log(value);
    },
  },
  created(){
    this.selected_model = [];
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
  width: 1000px;
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

.body-head{
  display:flex;
  align-items: center;
}
input, select{
  width: 90%;
  font-size: 16px;
  color: white;
}
select{
  height: 80%;
  background-color: #252525;
}
.name-input, .model-select{
  width:50%;
}
table {
  width: 100%;
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 15px;
  border: 1.5px solid #545454;
}
th {
  height: 30px;
  border: 1.5px solid #545454;
  font-size: 15px;
  font-weight: 400;
  background-color: #2c2c2c;
}
tr {
  cursor: pointer;
}
.unselected:hover {
  background-color: #ffffff08;
}
td {
  border: 1px solid #545454;
  height: 30px;
  width: 14%;
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

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
