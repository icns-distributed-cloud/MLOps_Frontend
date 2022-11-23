<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 열람</div>
          <div class="description">
            상위 5행의 데이터를 열람할 수 있습니다.
          </div>
        </div>
        <div class="modal-body">
          <div class="name">{{ datasetName }}</div>
          <Spinner v-if="isLoading" />
          <div class="preview-table-container">
            <table>
              <thead>
                <template v-for="(col, i) in data.column">
                  <th :key="i" v-if="col.dateTimeColumn">
                    {{ col.name }}
                  </th>
                </template>
                <template v-for="(col, i) in data.column">
                  <th :key="i" v-if="!col.dateTimeColumn">
                    {{ col.name }}
                  </th>
                </template>
              </thead>
              <tbody>
                <tr v-for="(row, i) in data.data" :key="i">
                  <template v-for="(col, j) in data.column">
                    <td
                      :key="j"
                      v-if="col.dateTimeColumn"
                      class="datetime-td"
                    >
                      {{ row[col.name] }}
                    </td>
                  </template>
                  <template v-for="(col, j) in data.column">
                    <td :key="j" v-if="!col.dateTimeColumn">
                      {{ row[col.name] }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner";

import { mapActions } from "vuex";
export default {
  props: ["datasetId", "datasetName"],
  components: {
    Spinner,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATA"]),
    close() {
      this.$emit("close");
    },
    getData() {
      this.FETCH_DATA({
        datasetId: this.datasetId,
        limit: 5,
      }).then((res) => {
        this.isLoading = false;
        this.data = res;
      });
    },
  },
  created() {
    this.getData();
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

.description {
  font-size: 15px;
  color: #e8e8e8c2;
  font-weight: 300;
}

.modal-body {
  padding: 15px 20px;
}
.name {
  font-size: 17px;
  padding-left: 10px;
}
.preview-table-container {
  overflow: auto;
}
table {
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
}
th {
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 15px;
  font-weight: 400;
  background-color: #2c2c2c;
}
td {
  border: 1px solid #353535;
  height: 30px;
  width: 12%;
}
.datetime-td {
  border: 1.5px solid #545454;
  background-color: #2c2c2c;
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

.delete-btn {
  background-color: #3f8ae2;
}
.delete-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
