<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div>데이터셋 버전 선택</div>
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
                <th>User Name</th>
                <th>Size</th>
                <th>Created</th>
              </thead>
              <tbody>
                <template
                v-for="(dataset, index) in getPredatasets.slice().reverse()"
                >
                  <tr
                    v-if="list_start <= index && index < list_end"
                    :key="dataset.id"
                    @click="select(dataset.id)"
                    :class="[
                      selected === dataset.id
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
                    <td>{{ dataset.username}}</td>
                    <td>{{ dataset.size }}</td>
                    <td>{{ dataset.createdDate }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="pagemove-btn" @click="prevpage">
            이전
          </button>
           
          <button class="pagemove-btn" @click="nextpage">
            다음
          </button>
          <button class="close-btn" @click="close">
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
  props: ["datasetId"],
  data() {
    return {
      list_start: 0,
      list_end: 10,
      page: 0,
      selected: -1,
      distance: 10,
    };
  },
  methods: {
    close() {
      this.$emit("close", this.selected);
    },
    select(id) {
      this.selected = id;
    },
    getPage(){
      this.list_start = this.distance * this.page;
      this.list_end = this.list_start+this.distance;
    },
    prevpage(){
      if (this.page > 0){
        this.page = this.page-1;
      }
      this.getPage();
    },
    nextpage(){
      if (this.page < parseInt(this.getPredatasets.length/this.distance)){
        this.page = this.page+1;
      }
      this.getPage();
    },
  },
  computed: {
    ...mapGetters("dataset", ["getPredatasets"])
  },
  created() {
    if (this.datasetId === 0) {
      this.selected = this.datasetId[0].id;
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
  width: 50%;
  max-height: 600px;
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
.pagemove-btn {
  background-color: #252525;
}
.pagemove-btn:hover {
  background-color: #676767a6;
}
.close-btn {
  background-color: #3f8ae2;
}
.close-btn:hover {
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

  justify-content: center;
  display: block;
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
  width: 250px;
}
.selected {
  background-color: #3f8ae2;
}
</style>