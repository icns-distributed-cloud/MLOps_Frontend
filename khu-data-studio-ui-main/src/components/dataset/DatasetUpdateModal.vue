<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 수정</div>
          <div class="description">
            데이터베이스 테이블 접속 정보를 입력하세요.
          </div>
        </div>
        <div class="modal-body">
          <div class="input">
            <label for="name">Dataset Name</label>
            <input
              type="text"
              id="name"
              autocomplete="off"
              v-model="name"
            />
          </div>
          <div class="input">
            <label for="host">Host</label>
            <input
              type="text"
              id="host"
              autocomplete="off"
              v-model="host"
            />
          </div>
          <div class="input">
            <label for="port">Port</label>
            <input
              type="text"
              id="port"
              autocomplete="off"
              v-model="port"
            />
          </div>
          <div class="input">
            <label for="db">Database</label>
            <input
              type="text"
              id="db"
              autocomplete="off"
              v-model="db"
            />
          </div>
          <div class="input">
            <label for="user">User</label>
            <input
              type="text"
              id="user"
              autocomplete="off"
              v-model="userName"
            />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              autocomplete="off"
              v-model="password"
            />
          </div>
          <div class="input">
            <label for="table">Table</label>
            <input
              type="text"
              id="table"
              autocomplete="off"
              v-model="tableName"
            />
          </div>
          <div class="input">
            <label for="table">Datetime Column</label>
            <input
              type="text"
              id="dateTimeColumn"
              autocomplete="off"
              v-model="dateTimeColumn"
            />
          </div>
          <div class="test">
            <button class="test-btn" @click="connect">
              Test Connection
            </button>
            <div
              class="test-msg test-succeeded"
              v-if="isSucceeded"
            >
              Succeeded
            </div>
            <div
              class="test-msg test-failed"
              v-if="isFailed"
            >
              Failed
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="update-btn" @click="update">
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
import { mapActions } from "vuex";
export default {
  props: ["dataset"],
  data() {
    return {
      isFailed: false,
      isSucceeded: false,
      name: this.dataset.name,
      host: this.dataset.host,
      port: this.dataset.port,
      db: this.dataset.db,
      userName: this.dataset.userName,
      password: this.dataset.password,
      tableName: this.dataset.tableName,
      dateTimeColumn: this.dataset.dateTimeColumn,
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "UPDATE_DATASET",
      "CONNECT",
    ]),
    close() {
      this.$emit("close");
    },
    update() {
      this.UPDATE_DATASET({
        datasetId: this.dataset.id,
        name: this.name,
        host: this.host,
        port: this.port,
        db: this.db,
        userName: this.userName,
        password: this.password,
        tableName: this.tableName,
        dateTimeColumn: this.dateTimeColumn,
      }).then(() => {
        this.FETCH_DATASETS();
      });
      this.$emit("close");
    },
    connect() {
      this.isSucceeded = false;
      this.isFailed = false;
      this.CONNECT({
        host: this.host,
        port: this.port,
        db: this.db,
        userName: this.userName,
        password: this.password,
        tableName: this.tableName,
      }).then((res) => {
        if (res.isConnected) {
          this.isSucceeded = true;
          setTimeout(() => {
            this.isSucceeded = false;
          }, 800);
        } else {
          this.isFailed = true;
          setTimeout(() => {
            this.isFailed = false;
          }, 800);
        }
      });
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

.description {
  font-size: 15px;
  color: #e8e8e8c2;
  font-weight: 300;
}

.modal-body {
  padding: 10px 20px;
  font-size: 15px;
}

.modal-body label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  margin: 3px;
  padding-left: 35px;
}
.input {
  margin: 10px 0;
}

input {
  display: block;
  margin: auto;
  height: 18px;
  width: 75%;
  background-color: #1f1f1f;
  border: none;
  color: #e8e8e8;
  padding: 3px 20px;
  outline: 1px #676767a6 solid;
}

.modal-footer {
  display: flex;
  justify-content: right;
  padding: 15px 20px;
  border-top: 0.2px #969696 solid;
}
.test {
  margin-top: 20px;
  margin-bottom: 5px;
  display: flex;
}
.test-btn {
  background-color: transparent;
  border: 1px #2f6cb1 solid;
  color: #2f6cb1;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  height: 22px;
}
.test-btn:hover {
  background-color: #2f6cb134;
}
.test-msg {
  margin: 0px 10px;
}
.test-succeeded {
  color: #42a45e;
}
.test-failed {
  color: #b54949;
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

.update-btn {
  background-color: #3f8ae2;
}
.update-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
