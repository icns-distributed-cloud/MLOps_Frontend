<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">상관계수 선택</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="content-header">
              <input class="methods" type="radio" v-model="corr_methods" value="0">Pearson
              <input class="methods" type="radio" v-model="corr_methods" value="1">Spearman
              <input class="methods" type="radio" v-model="corr_methods" value="2">Kendall
            </div>
            <div class="content-body">
              <img class="heatmap" v-if="corr_methods==0" src="~@/assets/images/Pearson_heatmap.png" />
              <img class="heatmap" v-if="corr_methods==1" src="~@/assets/images/Spearman_heatmap.png" />
              <img class="heatmap" v-if="corr_methods==2" src="~@/assets/images/Kendall_heatmap.png" />
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
import { mapGetters } from "vuex";
//import Spinner from "@/components/common/Spinner";
export default {
  props: ["col_list"],
  components: {
    //Spinner,
  },
  data() {
    return {
      corr_methods: -1,
    };
  },
  computed: {
    ...mapGetters("login", ["userId"]),

  },
  methods: {
    save(){
      console.log("save");
    },
    close() {
      this.$emit("close");
    },
  },
  created(){
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
  width: 700px;
  /*height: 650px;*/
  height: 780px;
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
.content {
  background-color: #1f1f1f;
  /*height: 475px;*/
  margin: 10px 0;
  height: 630px;
  border-radius: 0 0 10px 10px;
  text-align: center;
}
.content-header{
  border-bottom: 1px #969696 solid;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-body{
  width:100%;
  align-items: center;
  text-align: center;
  font-size: 20px;
}
.methods{
  border: none;
  outline: none;
  width: 50px;
}
.heatmap{
  width: 90%;
  height: 90%;
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
table {
  max-height: 100%;
  justify-content: center;
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border-collapse: separate;
  border-spacing: 0;
  display: block;
  overflow: auto;
}
th {
  position: sticky;
  top: 0px;
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
  width: 300px;
}
th:first-child {
  border-right: none;
}
td {
  border: 1.5px solid #353535;
  border-top: none;
  height: 20px;
  
}
td:first-child {
  border-right: none;
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

.show-btn {
  border: 1px solid rgb(157, 157, 157);
  color: rgb(157, 157, 157);
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
</style>
