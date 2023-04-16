<template>
  <div class="missing-value-control">
    <div class="data-description">
      결측치가 포함된 행을 나열합니다.
    </div>

    <div class="data-container">
      <div v-if="isLoading" class="loading">
        <Spinner />
      </div>
      <PredataSaveModal 
        v-if="isSaving"
        :preDatasetId="preDatasetId"
        :preProcessJson="preProcessJson"
        :preProcessType="preProcessType"
        :datasetType="datasetType"
        @close="closeSavingModal"
      />
      <DatasetDrawTable
            v-if="!isLoading"
            @turnoffSpiner="turnoffSpiner"
            :path="pathList[pathList.length-1]"
          />
      <div class="action-container">
        <div class="method-label">
          결측치 처리 방법을 선택하세요.
        </div>
        <select
          v-model="selectedMethod"
          class="method-select"
        >
          <option
            v-for="method in methods"
            :value="method.value"
            :key="method.value"
          >
            {{ method.text }}
          </option>
        </select>
        <div class="btn-container">
          <button class="restore-btn" @click="restore">
            복원
          </button>
          <button class="run-btn" @click="miniMapProcessing">
            수행
          </button>
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
import PredataSaveModal from "@/components/preprocessing/PredataSaveModal.vue";
import DatasetDrawTable from "@/components/common/DatasetDrawTable";
export default {
  props: ["dataset"],
  components: {
    Spinner,
    PredataSaveModal,
    DatasetDrawTable,
  },
  data() {
    return {
      data: [],
      saveData: [],
      originData: [],
      originDataNa: [],
      isLoading: true,
      isSaving: false,
      naIdxList: [],
      preDatasetId: 0,
      preProcessType: 0,
      idxCol: "created_at",
      methods: [
        {
          text: "VAR모델 예측값으로 대체",
          value: 0,
        },
        {
          text: "보간 예측값으로 대체",
          value: 1,
        },
      ],
      selectedMethod: 0,
      preProcessJson:{},
      selectedColList:[],
      datasetType: 0,
      pathList:[],
      item:{
        path: "",
        preDatasetId: 0,
        preProcessJson:{},
      }
    };
  },
  methods: {
    ...mapActions("dataset", ["PREVIEW_DATA"]),
    ...mapActions("cleaning", ["SAVE"]),
    /*
    findNa() {
      this.isLoading = true;
      this.FETCH_DATA({
        PredatasetId: this.predatasetId,
        limit: 0,
      }).then((res) => {
        this.originData = res;
        this.FIND_NA({ request: res }).then((res) => {
          this.saveData = res;
          this.data = res;
          this.originDataNa = res;
          this.isLoading = false;
          this.updateNaIdx();
        });
      });
    },
    updateNaIdx() {
      this.naIdxList = [];
      for (
        var i = 0;
        i < this.originDataNa.data.length;
        i++
      ) {
        for (
          var j = 0;
          j < this.originDataNa.column.length;
          j++
        ) {
          if (
            this.originDataNa.data[i][
              this.originDataNa.column[j].name
            ] === null
          ) {
            this.naIdxList.push({ i, j });
          }
        }
      }
    },
    isNaIdx(iIdx, jIdx) {
      var isContain = this.naIdxList.filter(
        (e) => e.i === iIdx && e.j === jIdx
      );
      return isContain.length > 0;
    },
    restore() {
      this.isLoading = true;
      this.data = this.originDataNa;
      this.isLoading = false;
    },
    runNa() {
      this.isLoading = true;
      this.RUN_NA({
        method: this.selectedMethod,
        idxCol: this.idxCol,
        request: this.originData,
      }).then((res) => {
        this.data = res.run;
        this.saveData = res.save;
        this.isLoading = false;
      });
    },
    */

    restore(){
      if(this.pathList.length>1){
        this.pathList.pop();
      }
    },
    close() {
      this.$emit("close");
    },
    closeSavingModal({code, preDatasetId}) {
      this.isSaving = false;
      if (code){
        this.preDatasetId = preDatasetId;
        this.getData();
        this.close();
      }
    },
    save() {
      this.preProcessType = this.selectedMethod;
      this.datasetType = 1;
      this.preProcessJson = this.dictToJSON();
      this.isSaving = true;
    },
    getData() {
      this.preDatasetId = this.dataset.preDatasetId;
      this.PREVIEW_DATA({
        preDatasetId: this.preDatasetId,
        })
        .then((res) => {
          this.pathList.push(res.data.miniDatasetPath);
          this.isLoading=false;
        });
    },
    turnoffSpiner(){
      this.isLoading = false;
    }, 
    dictToJSON(){
      return JSON.stringify({column:this.selectedColList});
    },
    async miniMapProcessing(){
      this.preProcessType = this.selectedMethod;
      this.datasetType = 2;
      this.preProcessJson = this.dictToJSON();

      this.isLoading = true;
      await this.SAVE({
        preDatasetId: this.preDatasetId,
        name: "MiniPreProcessing",
        isPublic: false, 
        preProcessJson: this.preProcessJson, 
        preProcessType : this.preProcessType,
        datasetType: this.datasetType,
        userId: this.userId,
      }).then((res) => {
        console.log(res);
        this.PREVIEW_DATA({
          preDatasetId: res.data.preDatasetId
        }).then((Preres)=>{
          console.log(Preres);
          this.pathList.push(Preres.data.miniDatasetPath);
          this.isLoading=false;
        })
        
      });
    },
  },
  created() {
    //this.findNa();
    this.getData();
  },
  computed:{
    ...mapGetters("login", ["userId"]),
  }
};
</script>

<style scoped>
.missing-value-control {
  height: 100%;
}
table {
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
}
th {
  height: 35px;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
}
td {
  border: 0.5px solid #353535;
  height: 30px;
  width: 12%;
}

.data-description {
  color: #e8e8e8;
  font-weight: 300;
  margin-bottom: 5px;
}
.data-container {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 35px);
}
.table-container {
  margin: auto;
  padding: auto;
  overflow: auto;
  width: 65%;
}

.action-container {
  margin-right: 20px;
  padding: 20px;
  position: relative;
  border: 0.8px solid rgba(109, 109, 109, 0.306);
  background-color: rgba(255, 255, 255, 0.014);
  border-radius: 15px;
  width: 250px;
  margin-left: 10px;
}
.loading {
  margin-top: 30px;
  width: 65%;
}
.method-label {
  color: #e8e8e8;
  margin-bottom: 10px;
}
.method-select {
  background-color: rgb(39, 39, 39);
  color: #e8e8e8;
  font-size: 16px;
  padding: 10px;
}
.btn-container {
  width: 250px;
  padding-right: 20px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
}
.btn-container button {
  width: 70px;
  font-size: 18px;
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

.restore-btn,
.run-btn {
  background-color: #373737;
}
.restore-btn:hover,
.run-btn:hover {
  background-color: #464646;
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
.na-td {
  border: 1px double #ae2f2f;
}
.datetime-td {
  border: 1.5px solid #545454;
  background-color: #2c2c2c;
  border: none;
}
</style>
