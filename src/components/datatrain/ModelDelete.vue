<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="title">모델 삭제</div>
            <div class="description">
                정말 모델을 삭제하시겠습니까?
            </div>
          </div>
          <div class="modal-body">
            <table>
              <template
                v-for="(model, index) in delete_model_list"
              >
                <tr 
                v-if="!model.deleted"
                :key="index"
                >
                  <td>{{ model.name }}</td>
                </tr>
              </template>
            </table>
          </div>
          <div class="modal-footer">
            <button class="delete-btn" @click="deletemodel">
              확인
            </button>
            <button class="close-btn" @click="close">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //import { mapGetters } from "vuex";
  export default {
    props: ["delete_model_list"],
    data() {
      return {
        selected: 1,
      };
    },
    methods: {
      deletemodel() {
        this.$emit("deleteModel", this.delete_model_list);
      },
      close() {
        this.$emit("close");
      },
      select(id) {
        this.selected = id;
      },
    },
    computed: {
    },
    created() {
      console.log(this.delete_model_list);
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
    width: 400px;
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
  
  .modal-body {
    padding: 10px 20px;
    font-size: 15px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: right;
    padding: 15px 20px;
    /*border-top: 0.2px #969696 solid;*/
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
  background-color: #252525;
}
.close-btn:hover {
  background-color: #676767a6;
}
  .delete-btn {
    background-color: #3f8ae2;
  }
  .delete-btn:hover {
    background-color: #2f6cb1;
  }
  .description {
    margin-left: 10px;
    font-weight: 300;
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
    border: 1px solid #353535;
    height: 30px;
    width: 14%;
  }
  .name {
    width: 250px;
  }
  .selected {
    background-color: #3f8ae2;
  }
  </style>
  