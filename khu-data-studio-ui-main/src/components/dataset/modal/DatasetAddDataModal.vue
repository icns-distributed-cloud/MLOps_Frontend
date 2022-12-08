<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 데이터 추가</div>
        </div>
        <div class="modal-body">
          <div class="method-menu">
            <div
              class="method"
              :class="{ unselected: selected !== 0 }"
              @click="select(0)"
            >
              데이터베이스 테이블
            </div>
            <div
              class="method"
              :class="{ unselected: selected !== 1 }"
              @click="select(1)"
            >
              CSV 파일
            </div>
          </div>
          <div class="content">
            <div
              v-if="selected === 0"
              class="input-container"
            >
              <div class="input">
                <div>
                  <!-- Todo : Not in api request -->
                  <label for="host">Data Source</label>
                  <select v-model="dataSource">
                    <option
                      v-for="ds in dataSourceList"
                      :key="ds.value"
                      :value="ds.value"
                    >
                      {{ ds.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="host">Host</label>
                  <input
                    type="text"
                    id="host"
                    autocomplete="off"
                    v-model="host"
                  />
                </div>
                <div>
                  <label for="port">Port</label>
                  <input
                    type="text"
                    id="port"
                    autocomplete="off"
                    v-model="port"
                  />
                </div>
              </div>
              <div class="input">
                <div>
                  <label for="username">User</label>
                  <input
                    type="text"
                    id="username"
                    autocomplete="off"
                    v-model="username"
                  />
                </div>
                <div>
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    autocomplete="off"
                    v-model="password"
                  />
                </div>
                <div>
                  <label for="db">Database</label>
                  <input
                    type="text"
                    id="db"
                    autocomplete="off"
                    v-model="db"
                  />
                </div>
              </div>
              <div class="input">
                <div>
                  <label for="table">Table</label>
                  <input
                    type="text"
                    id="table"
                    autocomplete="off"
                    v-model="table"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="selected === 1"
              class="input-container"
            >
              <div class="input">
                <div class="csv-input">
                  <label for="csv">CSV</label>
                  <input
                    type="file"
                    id="csv"
                    accept=".csv"
                    @change="handleCsvChange"
                  />
                </div>
              </div>
            </div>
            <div class="preview">
              <button class="preview-btn" @click="preview">
                Preview
              </button>
              <div class="preview-header">
                <div class="label">Preview</div>
                <div
                  class="msg"
                  v-if="previewMsg.length !== 0"
                  :class="{ 'error-msg': previewError }"
                >
                  {{ previewMsg }}
                </div>
              </div>
              <Spinner class="spinner" v-if="isLoading" />
              <div
                class="preview-table-container"
                v-if="!isLoading"
              >
                <table
                  v-if="Object.keys(this.data).length !== 0"
                >
                  <thead>
                    <th>
                      {{ this.data.dateTimeColumn }}
                    </th>
                    <th
                      v-for="(col, i) in data.column"
                      :key="i"
                    >
                      {{ col.name }}
                    </th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, i) in data.data"
                      :key="i"
                    >
                      <td class="datetime-td">
                        {{ row.date }}
                      </td>
                      <td
                        v-for="(col, j) in data.column"
                        :key="j"
                      >
                        {{ row.value[col.name] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div
            class="msg"
            v-if="saveMsg.length !== 0"
            :class="{ 'error-msg': saveError }"
          >
            {{ saveMsg }}
          </div>
          <button class="save-btn" @click="save">
            추가
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
import { mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["dataset"],
  components: {
    Spinner,
  },
  data() {
    return {
      isLoading: false,
      dataSource: 0,
      host: "13.209.8.19",
      port: "3306",
      db: "smartplant",
      username: "seohyun",
      password: "seohyun123",
      table: "hr_sensor_dataset",
      csv: "",
      selected: 0,
      methodList: [
        { value: 0, text: "데이터베이스 테이블 " },
        { value: 1, text: "csv 파일" },
      ],
      dataSourceList: [{ value: 0, text: "MySQL" }],
      saveMsgOrigin: "",
      saveError: false,
      previewMsgOrigin: "",
      previewError: false,
      data: {},
    };
  },
  computed: {
    saveMsg() {
      if (this.saveMsgOrigin === null) {
        return "실패하였습니다.";
      } else if (this.saveMsgOrigin.length > 50) {
        return this.saveMsgOrigin.slice(0, 50) + "...";
      }
      return this.saveMsgOrigin;
    },
    previewMsg() {
      if (this.previewMsgOrigin === null) {
        return "실패하였습니다.";
      } else if (this.previewMsgOrigin.length > 50) {
        return this.previewMsgOrigin.slice(0, 50) + "...";
      }
      return this.previewMsgOrigin;
    },
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "UPDATE_DATA_WITH_DATABASE",
      "UPDATE_DATA_WITH_CSV",
      "PREVIEW_WITH_DATABASE",
      "PREVIEW_WITH_CSV",
    ]),
    close() {
      this.$emit("close");
    },
    save() {
      this.validate = true;
      this.saveError = false;
      this.saveMsgOrigin = "데이터를 확인하고 있습니다.";
      if (this.selected === 0) {
        this.UPDATE_DATA_WITH_DATABASE({
          datasetId: this.dataset.id,
          host: this.host,
          port: this.port,
          db: this.db,
          username: this.username,
          password: this.password,
          table: this.table,
        })
          .then(() => {
            this.FETCH_DATASETS().then(() => {
              this.$emit("close");
            });
          })
          .catch((err) => {
            this.saveError = true;
            this.saveMsgOrigin = err.response.data.message;
          });
      } else {
        this.UPDATE_DATA_WITH_CSV({
          datasetId: this.dataset.id,
          csv: this.csv,
        })
          .then(() => {
            this.FETCH_DATASETS().then(() => {
              this.$emit("close");
            });
          })
          .catch((err) => {
            this.saveError = true;
            this.saveMsgOrigin = err.response.data.message;
          });
      }
    },

    handleCsvChange(e) {
      this.csv = e.target.files[0];
    },
    select(value) {
      this.selected = value;
      this.data = {};
      this.clearInput();
      this.saveMsgOrigin = "";
      this.saveError = false;
      this.previewMsOrigin = "";
      this.previewError = false;
      this.csv = "";
    },
    clearInput() {
      this.name = "";
      this.host = "";
      this.port = "";
      this.username = "";
      this.password = "";
      this.db = "";
      this.table = "";
    },

    preview() {
      this.data = {};
      this.previewError = false;
      this.previewMsOrigin = "데이터를 불러오고 있습니다.";
      this.isLoading = true;
      if (this.selected === 0) {
        this.PREVIEW_WITH_DATABASE({
          host: this.host,
          port: this.port,
          db: this.db,
          username: this.username,
          password: this.password,
          table: this.table,
        })
          .then((res) => {
            this.data = res;
            this.previewMsOrigin = "";
            this.isLoading = false;
          })
          .catch((err) => {
            this.previewError = true;
            this.previewMsOrigin =
              err.response.data.message;
            this.isLoading = false;
          });
      } else {
        this.PREVIEW_WITH_CSV({
          csv: this.csv,
        })
          .then((res) => {
            this.data = res;
            this.previewMsOrigin = "";
            this.isLoading = false;
          })
          .catch((err) => {
            this.previewError = true;
            this.previewMsOrigin =
              err.response.data.message;
            this.isLoading = false;
          });
      }
    },
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
  width: 550px;
  height: 600px;
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
.method-menu {
  display: flex;
  justify-content: center;
}
.method {
  padding: 10px 40px;
  width: 100%;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background-color: #1f1f1f;
  cursor: pointer;
  color: #3f8ae2;
}

.method:first-child {
  border-right: 4px solid #252525;
}
.unselected {
  border-bottom: 2px solid #252525;
  background-color: #505050;
  color: rgb(173, 173, 173);
  box-shadow: inset 0px -8px 7px 2px rgba(25, 25, 25, 0.306);
}
.unselected:hover {
  background-color: #424242;
}
.content {
  background-color: #1f1f1f;
  height: 475px;
  border-radius: 0 0 10px 10px;
}
.input-container {
  padding-top: 10px;
  height: 200px;
}

.input div {
  margin: 0px 13px;
}
.input label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  padding: 5px 0px;
}
.input {
  display: flex;
  margin-bottom: 3px;
  margin-left: 20px;
}
.input input {
  display: block;
  margin: auto;
  height: 18px;
  width: 120px;
  background-color: #1b1b1b;
  border: none;
  color: #e8e8e8;
  padding: 3px 0px;
  padding-left: 10px;
  outline: 1px #676767a6 solid;
}
.input select {
  background-color: #1b1b1b;
  color: #e8e8e8;
  width: 130px;
  height: 25px;
  padding: 0px 10px;
  border: none;
  outline: 1px #676767a6 solid;
}
.large-input input {
  width: 432px;
}
.csv-input input {
  width: 432px;
  height: 35px;
  line-height: 35px;
}
.preview {
  margin: 0px 20px;
  border-top: 1px solid #494949a4;
  position: relative;
}
.preview-header {
  display: flex;
  margin-top: 5px;
}

.preview-btn {
  position: absolute;
  right: 14px;
  top: -40px;
  background-color: transparent;
  border: 1px #2f6cb1 solid;
  color: #2f6cb1;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  height: 25px;
}
.preview-btn:hover {
  background-color: #2f6cb134;
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
input::file-selector-button {
  width: 70px;
  height: 20px;
  border-radius: 2px;
  color: #e8e8e8;
  font-weight: 400;
  border: 0.5px #b4b4b4a6 solid;
  cursor: pointer;
  background-color: #3f8ae2;
}
.preview-table-container {
  display: flex;
  justify-content: center;
  height: 175px;
  margin-top: 10px;
}
table {
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  font-size: 12px;
  border: 1.5px solid #545454;
  display: block;
  overflow: auto;
}
th {
  border: 1px solid #545454;
  border-top: none;
  font-size: 12px;
  font-weight: 400;
  background-color: #2c2c2c;
  min-width: 40px;
  border-top: none;
  padding: 3px 5px;
}
th:first-child {
  border-right: none;
}
td {
  border: 1px solid #353535;
  height: 30px;
  width: 12%;
}
.datetime-td {
  min-width: 130px;
  background-color: #2c2c2c;
  border-top: none;
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
.spinner {
  margin-top: 40px;
  font-size: 5px;
}

.msg {
  color: #3f8ae2;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: 300;
  margin: 0 5px;
}

.error-msg {
  color: rgb(210, 29, 29);
}
.input .required {
  outline: 1.5px #7e2020a6 solid;
}
</style>
