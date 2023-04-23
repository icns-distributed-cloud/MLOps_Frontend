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
              <input v-model="name"/>
            </div>
            <div class="model-select">
              <select v-model="selected_model">
                <option 
                v-for="(model, index) in model_info_list"
                :key="index"
                :value="model">
                  {{model.model_name}}
                </option>
              </select>
            </div>
          </div>
          <div class="body-options body-table">
            <table>
              <thead>
                <th>공개 여부</th>
                <th><input type="checkbox" v-model="isPublic"></th>
                <th>GPU 사용 여부</th>
                <th><input type="checkbox" v-model="isUseGPU"></th>
              </thead>
            </table>
          </div>
          <div class="method-menu">
            <div
              class="method"
              :class="{ unselected: selected !== 0 }"
              @click="select(0)"
            >
              데이터 속성 선택
            </div>
            <div
              class="method"
              :class="{ unselected: selected !== 1 }"
              @click="select(1)"
            >
              모델 하이퍼파라미터 설정
            </div>
          </div>
          <div class="content" v-if="selected === 0">
            <div class="selected-container">
              <table>
                <thead>
                  <th>라벨 속성</th>
                  <th>사용할 속성</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr
                    v-for="col, index in selected_cols"
                    :key="index"
                  >
                    <td class="label">
                      <label>
                        <div width=0 height=0 style="visibility:hidden">
                          <input type="checkbox" v-model="col.isLabel" @click="updateisLabel(1, index)" style="display:none">
                        </div>
                        <font-awesome-icon :icon="['fas', 'star']" v-if="col.isLabel"/>
                        <font-awesome-icon :icon="['far', 'star']" v-if="!col.isLabel"/>
                      </label>
                    </td>
                    <td class="name">
                      {{ col.name }}
                    </td>
                    <td class="action">
                      <button
                        class="delete-btn"
                        @click="deleteCol(index)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="nonselected-container">
              <table>
                <thead>
                  <th>라벨 속성</th>
                  <th>제거할 속성</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr
                    v-for="col, index in nonselected_cols"
                    :key="index"
                  >
                    <td class="label">
                      <label>
                        <div width=0 height=0 style="visibility:hidden">
                          <input type="checkbox" v-model="col.isLabel" @click="updateisLabel(0, index)" style="display:none">
                        </div>
                        <font-awesome-icon :icon="['fas', 'star']" v-if="col.isLabel"/>
                        <font-awesome-icon :icon="['far', 'star']" v-if="!col.isLabel"/>
                      </label>
                    </td>
                    <td class="name">
                      {{ col.name }}
                    </td>
                    <td class="action">
                      <button
                        class="delete-btn"
                        @click="addCol(index)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
          v-if="selected === 1">
            <div class="body-table">
              <table>
                <thead>
                  <th>하이퍼파라미터</th>
                  <th>값 입력</th>
                  <th>설명</th>
                </thead>
                <tbody>
                  <tr v-for="(param, index) in selected_model.parameter_json"
                  :key="index">
                    <td >{{param.param_name}}</td>
                    <td><input v-model="param.val"/></td>
                    <td>{{param.description}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="train-btn" @click="RunModelButton()">
            모델 훈련
          </button>
          <button class="close-btn" @click="close()">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import model_info from "@/assets/models/model_info_config"
export default {
  props: ["predatasetId", "col_list"],
  data() {
    return {
      name: "",
      model_info_list:[],
      selected_model:"",
      dataset_path:"",
      isPublic: false, 
      isUseGPU: false,
      label_index: 0,

      selected: 0,
      selected_cols: [],
      nonselected_cols: [],
      output_columns: "",
    };
  },
  methods: {
    ...mapActions("training", ["RUN_MODEL", "FETCH_RUNNING_MODELINFOS"]),
    ...mapActions("dataset", ["PREVIEW_DATA"]),
    SetSelectedCols(){
      this.col_list.forEach(elem => {
        this.selected_cols.push({
          name: elem.name,
          isLabel: false,
        })
      });
    },
    updateisLabel(isSelected, index){
      var col_name = "";
      this.selected_cols.forEach((elem) =>{elem.isLabel=false})
      this.nonselected_cols.forEach((elem) =>{elem.isLabel=false})
      if(isSelected){
        this.selected_cols[index].isLabel=true;
        col_name = this.selected_cols[index].name;
      }
      else{
        this.nonselected_cols[index].isLabel=true
        col_name = this.nonselected_cols[index].name;
      }
      this.output_columns=col_name;
    },
    close() {
      this.$emit("close");
    },
    select(value) {
      this.selected = value;
    },
    // 컬럼 선택 파트
    deleteCol(index) {
      this.nonselected_cols.push(this.selected_cols[index]);
      this.selected_cols.splice(index, 1);
    },
    addCol(index) {
      this.selected_cols.push(this.nonselected_cols[index]);
      this.nonselected_cols.splice(index, 1);
    },
    // 파라미터 설정 파트
    GetParamDict(){
      var dict = {"model" : {}};
      var val = '';
      dict["model"]["input_columns"] = [];
      dict["model"]["output_columns"] = [this.output_columns];
      dict["model"]["dataset_path"] = this.dataset_path;
      dict["model"]["model_type"] = this.selected_model.model_name;

      // 모델 생성 Req를 위한 하이퍼파라미터 딕셔너리 생성
      this.selected_model.parameter_json.forEach(elem => {
        if(elem.val_type == "int"){val = parseInt(elem.val);}
        else if (elem.val_type == "float"){val = parseFloat(elem.val);}
        else if (elem.val_type == "bool"){
          val = elem.val;
          val = String(val).toLowerCase();
          val = JSON.parse(val);
        }
        dict["model"][elem.param_name] = val;
      });

      this.selected_cols.forEach(elem => {
        dict["model"]["input_columns"].push(elem.name); 
      });

      return dict;
    },
    async RunModelButton() {
      if (this.selected_model === ""){alert("모델이 선택되지 않았습니다.")}
      else{
        await this.PREVIEW_DATA({
                preDatasetId : this.predatasetId
          }).then((res)=>{
            console.log(res)
            if (res.success){this.dataset_path = res.data.path; }
            else{
              alert("모델 생성에 실패하였습니다. 다시 시도해주세요.")
              return
            }
          })

        var parameterJson = this.GetParamDict();
        if (parameterJson["model"].input_columns.length < 1){alert("모델을 훈련할 데이터 속성이 비어있습니다.")}
        else if (parameterJson["model"].output_columns.length < 1){alert("모델을 훈련할 라벨 속성이 비어있습니다.")}
        else{
          this.RUN_MODEL({
              preDatasetId: this.predatasetId, 
              userId: this.userId, 
              name: this.name, 
              modelName: this.selected_model.model_name,
              parameterJson: JSON.stringify(parameterJson), 
              isPublic: this.isPublic, 
              isUseGPU: this.isUseGPU,
            })
            .then(()=>{
              this.FETCH_RUNNING_MODELINFOS({
                userId: this.userId,
              });
            })
            console.log(parameterJson);
            this.$emit("close");
          console.log(JSON.stringify(parameterJson));
        }
      }
    },
    Fetch_ModelInfos(){
      this.model_info_list = model_info;
    },
  },
  created(){
    this.Fetch_ModelInfos();
    // Deep copy, 그냥 사용하면 모달을 다시 띄울 때 컬럼이 사라짐
    this.SetSelectedCols();
  },
  computed: {
    ...mapGetters("login", ["userId"]),
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
.content {
  background-color: #1f1f1f;
  /*height: 475px;*/
  margin-bottom: 10px 0;
  height: 400px;
  border-radius: 0 0 10px 10px;
  display: flex;
}
.selected-container{
  width: 45%;
  height:400px;
  /*height: 90%;*/
  margin: auto;
  border: 1px #969696 solid;
  overflow: auto;
}
.nonselected-container{
  width: 45%;
  height:400px;
  /*height: 90%;*/
  margin: auto;
  border: 1px #969696 solid;
  overflow: auto;
}
.method-menu {
  display: flex;
  justify-content: center;
}
.method {
  padding: 10px 40px;
  width: 100%;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background-color: #1f1f1f;
  cursor: pointer;
  color: #3f8ae2;
}

.method:first-child {
  border-right: 4px solid #252525;
}
.unselected {
  border-bottom: 2px solid #252525;
  background-color: #505050;
  color: rgb(173, 173, 173);
  box-shadow: inset 0px -8px 7px 2px rgba(25, 25, 25, 0.306);
}
.unselected:hover {
  background-color: #424242;
}

.name {
  width: 70%;
}
.action {
  padding: 0 20px;
  max-width: 50px;
  color: #ffffff;
}
.action button {
  height: 25px;
  margin: 5px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
  font-size: 15px;
  color: rgb(157, 157, 157);
  border-color: rgb(157, 157, 157);;
}
.body-head{
  display:flex;
  align-items: center;
}
.body-options{
  padding: 10px 0;
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
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 15px;
  border: 1.5px solid #545454;
  overflow: auto;
}
table input{
  outline:none;
  background-color: none;
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
  width: 20%;
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
.train-btn {
  background-color: #3f8ae2;
}
.train-btn:hover {
  background-color: #2f6cb1;
}
.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
