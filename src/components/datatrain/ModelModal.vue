<template>
  <div class="modal-container">
    <div class="modal-body">
      <table>
        <tbody>
          <tr>
            <td>{{model_info.name}}</td>
            <td>진행 상황 : {{ProcessingMessage}}</td>
            <td>{{model_info.modelName}}</td>
            <td>val_loss : {{loss}}</td>
            <td>
              <button class="detail-btn" @click="Use_This_Model">
                모델 사용하기
              </button>
            </td>
          </tr>
          <tr>
            <td>시작 시간</td>
            <td>{{model_info.createdTime}}</td>
            <td v-if="isProcessing">경과 시간</td>
            <td v-if="isProcessing">{{process_time}}</td>
            <td v-if="!isProcessing">종료 시간</td>
            <td v-if="!isProcessing">{{endTime}}</td>
            <td>
              <button class="detail-btn" @click="Change_See_Detail">
                자세히보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="image-div" v-if="see_detail">
        <div class="log"  v-if="isLog">
          <textarea v-model="log_txt" :readonly="true"></textarea>
        </div>
        <div class="result" v-if="!isLog">
          <div class="accuracy image-box">
            <img :src=FIG1URL /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["model_info"],
  data() {
    return {
      BASEURL: "",
      FIG1URL: "",
      FIG2URL: "",
      LOGURL: "",
      timer: null,
      status: 0,
      selected: 1,
      see_detail: false,

      log_txt: "",
      process: "0%",
      loss: "0",
      predatasetName: "",
      createdTime: "",
      endTime: "",

      isLog: true,
      isProcessing: true,
      process_time: "",
      ProcessingMessage: "학습 중",
    };
  },
  /*created() {
    this.Set_Model_info()
  },*/
  methods: {
    ...mapActions("training", ["GET_MODEL_INFO"]),
    Process_time(x){
      var time = new Date(x).toISOString().toString();
      time = time.slice(0, time.length-5)
      time = time.replace("T", " ")
      return time;
    },

    async Get_Process_Info(){
      await this.GET_MODEL_INFO({
        trainId: this.model_info.trainId,
      })
      .then((res)=>{
        this.predatasetName = res.data.name;
        this.createdTime = new Date(res.data.createdTime).toLocaleDateString();
        this.endTime = res.data.endTime;
        this.endTime = this.Process_time(this.endTime);
        this.status = res.data.status;

        if(this.status){
          this.isProcessing = false;
          this.isLog = false;
          this.ProcessingMessage="학습 완료";

        }
        else{
          this.Get_Process_Time();
        }
      })
      
    },
    Change_See_Detail(){
      this.see_detail = !this.see_detail;
    },
    Use_This_Model(){
      const body = {
        "train_id" : this.model_info.trainId
      };
      console.log(body);
      fetch(this.$store.state.modelUSE+"/model/serving",{
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(body), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
      }).then((res) => {
          console.log(res);
      });
    },
    Get_Process_Time(){
      const now = new Date();
      const start_time = new Date(this.model_info.createdTime);

      now.setHours(now.getHours() - start_time.getHours());

      now.setMinutes(now.getMinutes() - start_time.getMinutes());

      now.setSeconds(now.getSeconds() - start_time.getSeconds());
      
      //this.process_time = now.getHours() +":"+ now.getMinutes() +":"+ now.getSeconds();
      this.process_time = this.Process_time(now.toString());
      this.process_time = this.process_time.slice(11, this.process_time.length);
    },

    async Update_Process_Info(blob){
      var log = await blob.text();
      var txt_list = log.split("\n");
      this.log_txt = txt_list.join("\n")
    },

    ReadLog(){
      fetch(this.LOGURL)
        .then((res) => {
          this.Update_Process_Info(res);
        });
      
    },
  },
  computed: {
    //...mapGetters("dataset", ["getDatasets"]),
  },
  mounted(){
    // 모델정보 읽어올 URL부분 수정
    this.BASEURL= this.$store.state.baseURL + "/outputs/" + String(this.model_info.trainId);
    //this.BASEURL= this.$store.state.baseURL + "/outputs/" + String(1);
    this.FIG1URL= this.BASEURL+"/fig1.png";
    this.LOGURL= this.BASEURL+"/process.log";
    
    if (this.isProcessing){
      this.timer = setInterval(() => {
          this.Get_Process_Info();
          this.ReadLog();
        }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  
};
</script>

<style scoped>



.modal-container {
  height: 90%;
  width: 80%;
  justify-content: center;
  padding: 10px;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
}

.modal-body {
  border: 1px #969696 solid;
  width: 100%;
  padding: 10px 20px;
  font-size: 15px;
}


.detail-btn {
  background-color: rgba( 255, 255, 255, 0 );
  color: #e8e8e8;
}
.detail-btn:hover {
  text-decoration: underline;
}
.description {
  margin-left: 10px;
  font-weight: 300;
}
table {
  width: 100%;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 15px;
  border: hidden;
  background-color: rgba(0, 0, 0, 0.5);
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
  border: 1px solid #353535;
  height: 30px;
  width: 14%;
}
.log {
  width: 100%
}
.selected {
  background-color: #3a3a3a;
}

img{
  width: 100%;
  height: 100%;
}
.image-div{
  background-color: #e8e8e8;
  display: flex;
}

.image-box{
  width: 50%;
  height: 100%;
  
}

textarea{
  width: 100%;
  height: 200px;
  max-width: 90%;
  margin: 10px;
}
</style>
