<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div>원본 데이터셋 선택</div>
        </div>
        <div class="modal-body">
          <div>
            <slot name="description"></slot>
            <table>
              <thead>
                <!--<th>Name</th>
                <th>Host</th>
                <th>Port</th>
                <th>Database</th>
                <th>Table</th>-->
                <th>No</th>
                <th>Dataset Name</th>
                <th>Size</th>
                <th>Created</th>
              </thead>
              <tbody>
                <template
                v-for="(dataset, index) in getDatasets.slice().reverse()"
                >
                  <tr
                    :key="dataset.originDatasetId"
                    @click="select(dataset.originDatasetId )"
                    :class="[
                      selected === dataset.originDatasetId 
                        ? 'selected'
                        : 'unselected',
                    ]"
                  >
                    <!--<td class="name">
                      {{ dataset.name }}
                    </td>
                    <td>{{ dataset.host }}</td>
                    <td>{{ dataset.port }}</td>
                    <td>{{ dataset.db }}</td>
                    <td>{{ dataset.tableName }}</td>-->
                    <td>{{ index }}</td>
                    <td class="name">
                      {{ dataset.name }}
                    </td>
                    <td>{{ convertFileSize(dataset.fileSize) }}</td>
                    <td class="date">{{ dataset.createdTime }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
          <button class="submit-btn" @click="submit">
            완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list_start: 0,
      list_end: 10,
      page: 0,
      selected: -1,
      distance: 10,
      fileSize: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit", this.selected);
    },

    select(id) {
      this.selected = id;
    },
    convertFileSize(filesize){
      var count = 0;
      var ch = "";
      while(filesize>1000){
        count = count + 1;
        filesize = (filesize/1000).toFixed(2);
      }
      switch(count){
        case 0:
          ch = "B"
          break
        case 1:
          ch = "Kb"
          break
        case 2:
          ch = "Mb"
          break
        default:
          ch = "Gb"
      }
      return  filesize.toString() + ch;
    },
  },
  computed: {
    ...mapGetters("dataset", ["getDatasets"])
  },
  created() {
    if (this.OridatasetId === 0) {
      this.selected = this.getDatasets[0].id;
    } else {
      this.selected = this.OridatasetId;
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
  width: 50%;
  /*height: 500px;*/
  max-width: 800px;
  /*max-height: 600px;*/
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
  max-height: 500px;
  overflow: auto;
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
.pagemove-btn {
  background-color: #252525;
}
.pagemove-btn:hover {
  background-color: #676767a6;
}
.submit-btn {
  background-color: #3f8ae2;
}
.submit-btn:hover {
  background-color: #2f6cb1;
}
.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.description {
  margin-left: 10px;
  font-weight: 300;
}
table {
  overflow: auto;
  width: 100%;
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 15px;
  border: 1.5px solid #545454;

  justify-content: center;
  
}
table>tbody {
  height: 300px;
  overflow: auto;
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
  width: 150px;
}
.date {
  width: 80px;
}
.selected {
  background-color: #3f8ae2;
}
</style>