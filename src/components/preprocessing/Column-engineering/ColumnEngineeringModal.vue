<template>
  <div class="missing-value-control">
    <div class="data-description">
      사용할 속성을 선택합니다.
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
      <DemoDatasetDrawTable
            v-if="!isLoading"
            @turnoffSpiner="turnoffSpiner"
            :path="pathList[pathList.length-1]"
            :ban_list="ban_list"
          />
      <div class="action-container">
        <div class="method-label">
          속성 엔지니어링 방법을 선택하세요.
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
        <div v-if="this.selectedMethod == 0">
          <button class="selectcolumn-btn" @click="openColumnSelect">
            속성 선택
          </button>
        </div>
        <div v-if="this.selectedMethod == 1">
          <button class="selectcolumn-btn" @click="openCorrMethodSelectModal">
            상관계수 선택
          </button>
        </div>
        <div class="btn-container">
          <!--<button class="restore-btn" @click="restore">
            복원
          </button>
          <button class="run-btn" @click="miniMapProcessing">
            수행
          </button>-->
          <button class="save-btn" @click="save">
            저장
          </button>
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
    <ColumnSelectModal 
    v-if="showColumnSelectModal"
    @close="closeColumnSelect"
    :col_list="col_list"
    />
    <CorrMethodSelectModal 
    v-if="showCorrMethodSelectModal"
    @close="closeCorrMethodSelectModal"
    :dataset="dataset"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
import PredataSaveModal from "@/components/preprocessing/PredataSaveModal.vue";
import DemoDatasetDrawTable from "@/components/preprocessing/Column-engineering/DemoDatasetDrawTable.vue";
import ColumnSelectModal from "@/components/preprocessing/Column-engineering/ColumnSelectModal.vue";
import CorrMethodSelectModal from "@/components/preprocessing/Column-engineering/CorrMethodSelectModal.vue";
export default {
  props: ["dataset"],
  components: {
    Spinner,
    PredataSaveModal,
    DemoDatasetDrawTable,
    ColumnSelectModal,
    CorrMethodSelectModal,
  },
  data() {
    return {
      isLoading: true,
      isSaving: false,
      showColumnSelectModal: false,
      showCorrMethodSelectModal: false,
      preDatasetId: 0,
      preProcessType: 0,
      selectedMethod: 0,
      datasetType: 0,
      data: [],
      saveData: [],
      originData: [],
      originDataNa: [],
      naIdxList: [],
      preProcessJson:{},
      pathList:[],
      ban_list:[],
      col_list:[],
      idxCol: "created_at",
      methods: [
        /*{
          text: "수동으로 속성 선택",
          value: 0,
        },*/
        {
          text: "상관계수를 이용하여 선택",
          value: 0,
        },
      ],
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
    turnoffSpiner(col_list){
      this.isLoading = false;
      this.col_list = col_list;
    }, 
    dictToJSON(){
      return JSON.stringify({column:this.selectedColList});
    },
    miniMapProcessing(){
      this.preProcessType = this.selectedMethod;
      this.datasetType = 2;
      this.preProcessJson = this.dictToJSON();

      this.isLoading = true;
      this.SAVE({
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
          this.pathList.push(Preres.data.miniDatasetPath);
        })
        
      });
    },
    openColumnSelect(){
      this.showColumnSelectModal = true;
    },
    closeColumnSelect(payload){
      this.col_list = payload;
      this.showColumnSelectModal = false;
    },
    openCorrMethodSelectModal(){
      this.showCorrMethodSelectModal = true;
    },
    closeCorrMethodSelectModal(){
      this.showCorrMethodSelectModal = false;
    },
  },
  created() {
    //this.findNa();
    this.getData();
    console.log(this.dataset);
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
  margin-bottom: 10px;
  width: 250px;
}
.selectcolumn-btn{
  width: 250px;
  height: 30px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  background-color: #373737;
}
.selectcolumn-btn:hover {
  background-color: #464646;
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
