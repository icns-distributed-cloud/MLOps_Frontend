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

        <ModelAddModal 
          v-if="showModelAddModal" 
          @close="closeModelAddModal" 
          :predatasetId="predatasetId"
          :col_list="col_list"
        />
        <ModelDelete 
        v-if="showModelDelete" 
        :delete_model_list="delete_model_list"
        @close="closeModelDelete"
        @deleteModel="deleteModel"/>
        <ModelCompareModal v-if="showModelCompare" @close="closeModelCompare" />

        <div class="models-container" v-if="!isLoading">
          <div class="table-container">
            <table>
              <tbody>
                <template
                v-for="(model, index) in getRunningModelinfos.slice().reverse()"
                >
                  <tr
                    v-if="model.preDatasetId == predatasetId && !model.deleted" :key="index"
                  >
                    <input class="model_checkbox" type="checkbox" v-model="checked_model_list" :value="index"/>
                    <ModelModal v-bind:model_info="model"  
                    v-bind:key="getRunningModelinfos.length - index -1"
                    ></ModelModal>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <!--<button class="footer-btn pagemove-btn" @click="prevpage">
          이전
        </button>
        <button class="footer-btn pagemove-btn" @click="nextpage">
          다음
        </button>-->
        <button class="footer-btn" @click="openModelDelete">
          선택 모델 삭제
        </button>
        
        <!--<button class="footer-btn" @click="openModelCompare">
          선택 모델 비교
        </button>-->
        
      </div>
    </div>
  </div>
</template>
  
<script>
  import { mapGetters, mapActions } from "vuex";
  import Spinner from "@/components/common/Spinner";
  import ModelModal from "@/components/datatrain/ModelModal.vue";
  import ModelAddModal from "@/components/datatrain/ModelAddModal.vue"; 
  import ModelDelete from "@/components/datatrain/ModelDelete.vue"; 

  export default {
    props: ["predatasetId"],
    components: {
      Spinner,
      ModelModal,
      ModelAddModal,
      ModelDelete
    },
    data() {
      return {
        path:"",
        col_list: [],
        delete_model_list:[],
        checked_model_list: [],
        isLoading: false,
        showModelAddModal: false,
        
        showModelDelete: false,
        showModelCompare: false,
      };
    },
    methods: {
      ...mapActions("training", ["FETCH_RUNNING_MODELINFOS", "DELETE_MODEL"]),
      ...mapActions("dataset", ["PREVIEW_DATA"]),
      //...mapActions("cleaning", ["FIND_NA", "RUN_NA"]),
      
      //새 모델 생성 open, close
      openModelAddModal() {this.showModelAddModal = true;},
      closeModelAddModal() {
        this.showModelAddModal = false;
        //this.$router.go(this.$router.currentRoute);

      },
      //선택 모델 삭제 open, close
      openModelDelete() {
        this.delete_model_list = [];
        this.checked_model_list.forEach(elem => {
          this.delete_model_list.push(this.getRunningModelinfos.slice().reverse()[elem]);
        });
        this.showModelDelete = true;
      },
      closeModelDelete() {this.showModelDelete = false;},

      deleteModel(delete_model_list) {
        delete_model_list.forEach((elem) =>{
          this.DELETE_MODEL({
            modelId: elem.modelId
          }).then((res) => {
            if(!res.success){
              alert(elem.name+" 모델삭제를 실패했습니다.");
            }
            else{
              console.log(res);
              this.FETCH_RUNNING_MODELINFOS({
                userId: this.userId,
              }).then(()=>{this.getData();});
              this.showModelDelete = false;
            }
          })
        })
        
      },
      //선택 모델 비교 open, close
      openModelCompare() {this.showModelCompare = true;},
      closeModelCompare() {this.showModelCompare = false;},

      //전처리 데이터셋 정보 가져오기
      getData() {
        this.PREVIEW_DATA({
          preDatasetId: this.predatasetId,
          })
          .then((res) => {
            this.path = res.data.miniDatasetPath;
            if (this.path == null){
              alert("데이터를 찾을 수 없습니다.");  
            }
            else{
              this.path = this.$store.state.baseURL +'/'+ this.path;
              fetch(this.path)
              .then((res) => {
                this.EditTable(res);
              });
            }
            this.isLoading=false;
          });
      },
      async EditTable(blob){
        var txt = await blob.text();
        var split_line = txt.split('\n');

        // Create Columns
        var columns = split_line[0].replace('\r', '').split(',')
        columns.forEach((col)=>{
          this.col_list.push({
            "name":col, "type":typeof(col),
          });
        })
      },
      

    },
    created() { // 테스트용으로 mounted를 쓰지만, 이후 데이터를 가져올때는 created사용
      this.FETCH_RUNNING_MODELINFOS({
        userId: this.userId,
      });
      this.getData();
    },
    computed: {
      ...mapGetters("training", ["getRunningModelinfos"]),
      ...mapGetters("login", ["userId"]),
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
  width: 100%;
  justify-content: center;
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border-collapse: separate;
  /*border-collapse: collapse;*/
  border-spacing: 0;
  overflow: auto;
}

tr{
  display: flex;
  align-items: center;
  width:100%;
  padding: 0px, 20px;
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
  