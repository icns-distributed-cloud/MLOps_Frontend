<template>
  <div class="model-train-control">
    <div class="data-description">
      데이터 셋으로 훈련한 모델들을 확인할 수 있습니다.
    </div>
    <div class="content">
      <div class="content-header">
        <button class="add-btn" @click="openModelAddModal">
        새 모델 생성
        </button>
      </div>
      <div class="data-container">
        <div v-if="isLoading" class="loading">
          <Spinner />
        </div>

        <ModelAddModal v-if="showModelAddModal" @close="closeModelAddModal" />
        <ModelDelete v-if="showModelDelete" @close="closeModelDelete" />
        <ModelCompareModal v-if="showModelCompare" @close="closeModelCompare" />

        <div class="models-container" v-if="!isLoading">
          <div class="table-container">
            <table>
              <tbody>
                <tr
                  v-for="(model, index) in models"
                  :key="index"
                >
                  <ModelModal v-bind:model_info="model"  v-bind:key="index"></ModelModal>
                  <input class="model_checkbox" type="checkbox" v-model="checked_model_list" :value="index"/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <button class="footer-btn" @click="openModelDelete">
        선택 모델 삭제
        </button>
        <button class="footer-btn" @click="openModelCompare">
        선택 모델 비교
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
//  import { mapActions } from "vuex";
  import Spinner from "@/components/common/Spinner";
  import ModelModal from "@/components/datatrain/ModelModal.vue";
  import ModelCompareModal from "@/components/datatrain/ModelCompareModal.vue";
  import ModelAddModal from "@/components/datatrain/ModelAddModal.vue"; 

  export default {
    props: ["datasetId"],
    components: {
      Spinner,
      ModelModal,
      ModelCompareModal,
      ModelAddModal
    },
    data() {
      return {
        checked_model_list: [],
        isLoading: false,
        showModelAddModal: false,
        
        showModelDelete: false,
        showModelCompare: false,
        models : [
          {
            name: "Test Model v1",
            dataset_name : "Walmart_sales.csv",
            model_name: "ARIMA",
            process: 0,
            accuracy: 0,
            start_time : "2022-11-23 15:22:13",
            process_time: "00:16:15",
            accuracy_url: "acc_img.png",
            loss_url: "loss_img.png",
          },
          {
            name: "Test Model v2",
            dataset_name : "Walmart_sales.csv",
            model_name: "LSTM",
            process: 0,
            accuracy: 0,
            start_time : "2022-11-23 11:22:33",
            process_time: "00:12:34",
            accuracy_url: "acc_img.png",
            loss_url: "loss_img.png",
          },
        ]
      };
    },
    methods: {
      //...mapActions("dataset", ["FETCH_DATA", "UPDATE_DATA"]),
      //...mapActions("cleaning", ["FIND_NA", "RUN_NA"]),
      FetchModels(){
        if (this.models.length == 0){
          this.isLoading = true;
        }
        else{
          this.isLoading = false;
        }
      },
      
      //새 모델 생성 open, close
      openModelAddModal() {this.showModelAddModal = true;},
      closeModelAddModal() {this.showModelAddModal = false;},
      //선택 모델 삭제 open, close
      openModelDelete() {this.showModelDelete = true;},
      closeModelDelete() {this.showModelDelete = false;},
      //선택 모델 비교 open, close
      openModelCompare() {this.showModelCompare = true;},
      closeModelCompare() {this.showModelCompare = false;},

    },
    /*created() { // 테스트용으로 mounted를 쓰지만, 이후 데이터를 가져올때는 created사용
      this.FetchModels();
    },*/
    mounted() {
      this.FetchModels();
    },
  };
  </script>
  
  <style scoped>
  .content {
    width: 95%;
    height: calc(100vh - 110px);
    background-color: #1e1e1e;
    border-radius: 10px;
    margin: 20px auto;
    margin-top: 0px;
    box-sizing: border-box;
    padding: 15px;
}
  .model-train-control {
    height: 100%;
  }
  
  .data-description {
    color: #e8e8e8;
    font-weight: 300;
    margin-bottom: 5px;
  }
  .table-container {
  padding-top: 10px;
  overflow: auto;
  height: calc(100% - 50px);
}

table {
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  width: 100%;
}

tr{
  display: flex;
  align-items: center;
  width:100%;

}
  .loading {
    margin-top: 30px;
    width: 65%;
  }

  .content-header {
  margin: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: right;
}
.add-btn {
  width: 190px;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
  margin-right: 30px;
}
.models-container {
  height: 90%;
  width: 100%;
  justify-content: center;
  margin: 0px auto;
  padding: 10px;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
}

.model_checkbox{
  width: 20px;
  height: 20px;
}

v-col{
  display: flex;
}

button:hover {
  background-color: #2f6cb1;
}

.content-footer {
  margin: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: right;
}
.footer-btn {
  width: 150px;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
  margin-right: 30px;
}
</style>
  