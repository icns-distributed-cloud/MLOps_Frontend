<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div>선택 모델 비교</div>
          </div>
          <div class="modal-body">
            <div class="image-div">
              <img :src="require(`@/assets/images/${compare_img}`)" /> 
            </div>
          </div>
          <div class="modal-footer">
            <button class="close-btn" @click="close">
                완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //import { mapGetters } from "vuex";
  export default {
    props: ["datasetId"],
    data() {
      return {
        selected: 1,
        compare_img: "compare_img.png",
        see_detail: false,
      };
    },
    methods: {
      close() {
        this.$emit("close", this.selected);
      },
      select(id) {
        this.selected = id;
      },
    },
    /*
    computed: {
      ...mapGetters("dataset", ["getDatasets"]),
    },
    */
    created() {
      if (this.datasetId === 0) {
        this.selected = this.getDatasets[0].id;
      } else {
        this.selected = this.datasetId;
      }
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
    width: 800px;
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
    border-top: 0.2px #969696 solid;
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
    background-color: #3f8ae2;
    color: #e8e8e8;
  }
  .close-btn:hover {
    background-color: #2f6cb1;
  }
  .close-btn:disabled {
  background-color: #3f8be23f;
}
  .unselected:hover {
    background-color: #ffffff08;
  }

  
  img{
    width: 100%;
    height: 100%;
  }
  .image-div{
    background-color: #e8e8e8;
    display: flex;
  }

  </style>
  