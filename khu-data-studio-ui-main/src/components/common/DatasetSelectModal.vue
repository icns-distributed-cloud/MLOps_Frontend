<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div>데이터셋 선택</div>
        </div>
        <div class="modal-body">
          <div>
            <slot name="description"></slot>
            <div class="table-container">
              <table>
                <thead>
                  <th>데이터셋</th>
                  <th class="history-th">
                    최근 결측치 처리 이력
                  </th>
                  <th class="history-th">
                    최근 노이즈 제거 이력
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="dataset in getDatasets"
                    :key="dataset.id"
                    @click="select(dataset.id)"
                    :class="[
                      selected === dataset.id
                        ? 'selected'
                        : 'unselected',
                    ]"
                  >
                    <td class="name">
                      {{ dataset.name }}
                    </td>
                    <template>
                      <td
                        class="history-td"
                        v-if="
                          dataset.historyMissingValue !==
                          null
                        "
                      >
                        <span class="history-td-desc"
                          >처리방법 :
                        </span>

                        {{
                          dataset.historyMissingValue.method
                        }}

                        <br />

                        <span class="history-td-desc">
                          수행일시 :
                        </span>
                        {{
                          formatDate(
                            dataset.historyMissingValue
                              .createdDate
                          )
                        }}
                      </td>
                      <td v-else>-</td>
                    </template>
                    <template>
                      <td
                        class="history-td"
                        v-if="dataset.historyNoise !== null"
                      >
                        <span class="history-td-desc"
                          >가중치 :
                        </span>
                        {{ dataset.historyNoise.com }}

                        <br />

                        <span class="history-td-desc"
                          >수행일시 :
                        </span>
                        {{
                          formatDate(
                            dataset.historyNoise.createdDate
                          )
                        }}
                      </td>
                      <td v-else>-</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="cancel">
            취소
          </button>
          <button
            class="close-btn"
            @click="close"
            :disabled="selected === 0"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["datasetId"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
    close() {
      this.$emit("close", this.selected);
    },
    select(id) {
      this.selected = id;
    },
    cancel() {
      this.$router.push({ name: "manage" });
    },
    formatDate(createdDate) {
      let date = createdDate.slice(0, 10);
      let time = createdDate.slice(11, 19);
      return date + " " + time;
    },
  },
  computed: {
    ...mapGetters("dataset", ["getDatasets"]),
  },
  created() {
    this.FETCH_DATASETS();
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
  width: 900px;
  height: 400px;
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

.cancel-btn {
  background-color: #373737;
}
.cancel-btn:hover {
  background-color: #464646;
}

.close-btn {
  background-color: #3f8ae2;
}
.close-btn:hover {
  background-color: #2f6cb1;
}

.close-btn:disabled {
  background-color: #3f8be23f;
}
.description {
  margin-left: 10px;
  font-weight: 300;
}
.table-container {
  display: flex;
  justify-content: center;
  height: 230px;
}
table {
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  font-size: 15px;
  border: 1.5px solid #545454;
  display: block;
  overflow: auto;
}
th {
  position: sticky;
  top: 0px;
  height: 30px;
  border: 1.5px solid #545454;
  font-size: 15px;
  font-weight: 400;
  background-color: #2c2c2c;
  width: 400px;
}
.history-th {
  min-width: 130px;
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
}

.selected {
  background-color: #3f8ae2;
}
.history-td {
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 15px;
}

.history-td-desc {
  font-size: 13px;
  color: rgb(213, 172, 49);
}
</style>
