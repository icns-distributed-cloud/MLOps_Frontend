<template>
  <div class="modal-container">
    <div class="modal-body">
      <table>
        <tbody>
          <tr>
            <td>{{model_info.name}}</td>
            <td>{{model_info.dataset_name}}</td>
            <td>{{model_info.model_name}}</td>
            <td>진행도 : {{model_info.process}}</td>
            <td>loss : {{model_info.loss}}</td>
          </tr>
          <tr>
            <td>시작 시간</td>
            <td>{{this.model_info.createdDate}}</td>
            <td>경과 시간</td>
            <td>{{model_info.process_time}}</td>
            <td>
              <button class="detail-btn" @click="Change_See_Detail">
                자세히보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="image-div modal-body" v-if="see_detail">
      <div class="accuracy image-box">
        <img :src="require(`@/assets/images/${model.accuracy_url}`)" /> 
      </div>
      <div class="loss image-box">
        <img :src="require(`@/assets/images/${model.loss_url}`)" /> 
      </div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  props: ["model_info"],
  data() {
    return {
      selected: 1,
      see_detail: false,
    };
  },
  created() {
    this.Set_Model_info()
  },
  methods: {
    Change_See_Detail(){
      this.see_detail = !this.see_detail;
    },
    Set_Model_info(){
      this.model = this.model_info;
    },
    Get_Process_Time(){
      const s = 1000;
      const m = s*60;
      const h = m*60;
      const now = new Date();
      const start_time = new Date(this.model_info.start_time);
      var diff = now - start_time;
      now.setHours(parseInt(diff/h));
      diff = diff % h;
      now.setMinutes(parseInt(diff/m));
      diff = diff % m;
      now.setSeconds(parseInt(diff/s));
      this.model_info.process_time = now.getHours() +":"+ now.getMinutes() +":"+ now.getSeconds();
    },
  },
  computed: {
    //...mapGetters("dataset", ["getDatasets"]),
  },
  mounted(){
    setInterval(this.Get_Process_Time, 1000);
  }
  
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
</style>
