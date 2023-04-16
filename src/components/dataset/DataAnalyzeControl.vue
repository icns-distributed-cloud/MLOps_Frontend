<template>
  <div class="model-train-control">
    <div class="data-description">
      분석용으로 변환된 데이터셋을 확인할 수 있습니다.
    </div>
    <div class="content">
      <div class="content-header"> <!--Put the Dataset Name here-->
      </div>
      <div class="data-container">
        <AnalyzedDataSetName 
        v-if="isNaming"
        @close="closeAnalyzedDataSetName"
        @save="saveName"
        :predatasetId="predatasetId"
        />
        <div v-if="isLoading" class="loading">
          <Spinner />
        </div>
        <DatasetDrawTable
            v-if="isDraw"
            @turnoffSpiner="turnoffSpiner"
            :path="pathList[pathList.length-1]"
          />
      </div>
      <div class="content-footer">
      </div>
    </div>
  </div>
</template>
  
<script>
  import { mapGetters, mapActions } from "vuex";
  import AnalyzedDataSetName from "@/components/dataset/modal/AnalyzedDataSetName.vue";
  import Spinner from "@/components/common/Spinner";
  import DatasetDrawTable from "@/components/common/DatasetDrawTable";

  export default {
    props: ["predatasetId"],
    components: {
      Spinner,
      AnalyzedDataSetName,
      DatasetDrawTable
    },
    data() {
      return {
        name:"",

        newpredatasetId : -1,
        checked_model_list: [],
        isLoading: false,
        isNaming: true,
        isDraw : false,
        showModelAddModal: false,
        
        showModelDelete: false,
        showModelCompare: false,
        pathList:[],
      };
    },
    methods: {
      ...mapActions("dataset", ["CREATE_HAPPY_PRE", "PREVIEW_DATA"]),
      
      // 분석용 데이터셋 이름입력 모달창(AnalyzedDataSetName) close시 동작
      closeAnalyzedDataSetName() {
        this.isNaming = false;
      },
      async saveName(name){
        var predata_path = "";
        this.name = name;
        
        console.log("분석용 데이터셋 이름");
        console.log(this.name);
        console.log( this.isNaming);

        // 이곳에 분석데이터 API 넣음
        await this.CREATE_HAPPY_PRE({
          preDatasetId:this.predatasetId, 
          name:this.name, 
          userId:this.userId, 
          PreProcessType:0,
        })
        .then((res) => {
            if(res.success){
              this.isLoading = false;
              this.newpredatasetId = res.data.preDatasetId;
              this.PREVIEW_DATA({
                preDatasetId : this.newpredatasetId
              }).then((Preres) => {
                console.log("Preres");
                console.log(Preres);
                this.isNaming = false;

                predata_path = "datasets/mini/"+String(Preres.data.preDatasetId)+"_";
                this.pathList.push(predata_path+this.name)
                
                this.isLoading = true;
                setTimeout(() => this.isDraw=true, 10000);
              })
            }
            else{
              alert("데이터 등록에 실패하였습니다. 다시 시도해주세요.")
            }
        });
        
        // 분석데이터가 완료되면, 데이터의 path를 리턴받아 테이블 작성
        // 테스트
        //
      },
      turnoffSpiner(){
        this.isLoading = false;
      },
    },
    computed: {
      ...mapGetters("login", ["userId"]),
    },
  };
  </script>
  
<style scoped>
  .content {
    width: 95%;
    height: calc(100vh - 200px);
    background-color: #1e1e1e;
    border-radius: 10px;
    margin: 20px auto;
    margin-top: 0px;
    box-sizing: border-box;
    padding: 15px;
}
.data-container {
  max-height: 100px;
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
  display: flex;
  justify-content: center;
  height: 750px;
  max-height: 80%;
  margin-top: 10px;
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
  margin: 10px 0px;
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
  margin-right: 10px;
}
.pagemove-btn {
  width: 60px;
  background-color: #252525;
}
.pagemove-btn:hover {
  background-color: #676767a6;
}
</style>
  