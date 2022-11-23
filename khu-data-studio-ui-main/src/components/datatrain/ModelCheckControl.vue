<template>
    <div class="model-check-control">
      <div class="data-description">
        모델의 학습 상태를 확인할 수 있습니다.
      </div>
  
      <div class="data-container">
        <div v-if="isLoading" class="loading">
          <Spinner />
        </div>
        <div class="table-container" v-if="!isLoading">
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
                  <td
                    :key="j"
                    v-if="!col.dateTimeColumn"
                    :class="{ 'na-td': isNaIdx(i, j) }"
                  >
                    {{ row[col.name] }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <!--
        <div class="action-container">
          <div class="method-label">
            결측치 처리 방법을 선택하세요.
          </div>
          <select
            v-model="selectedMethod"
            class="method-select"
          >
            <option
              v-for="method in methods"
              :value="method.value"
              :key="method.value"
            >
              {{ method.text }}
            </option>
          </select>
          <div class="btn-container">
            <button class="restore-btn" @click="findNa">
              복원
            </button>
            <button class="run-btn" @click="runNa">
              수행
            </button>
            <button class="save-btn" @click="save">
              저장
            </button>
          </div>
        </div>-->
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import Spinner from "@/components/common/Spinner";
  export default {
    props: ["datasetId"],
    components: {
      Spinner,
    },
    data() {
      return {
        data: [],
        saveData: [],
        originData: [],
        originDataNa: [],
        isLoading: true,
        naIdxList: [],
        selectedMethod: "0",
        idxCol: "created_at",
        methods: [
          {
            text: "VAR모델 기반 예측값으로 대체",
            value: "0",
          },
          {
            text: "전,후 데이터 평균값으로 대체",
            value: "1",
          },
          {
            text: "결측치 포함 행 제거",
            value: "2",
          },
        ],
      };
    },
    methods: {
      ...mapActions("dataset", ["FETCH_DATA", "UPDATE_DATA"]),
      ...mapActions("cleaning", ["FIND_NA", "RUN_NA"]),
      findNa() {
        this.isLoading = true;
        this.FETCH_DATA({
          datasetId: this.datasetId,
          limit: 0,
        }).then((res) => {
          this.originData = res;
          this.FIND_NA({ request: res }).then((res) => {
            this.saveData = res;
            this.data = res;
            this.originDataNa = res;
            this.isLoading = false;
            this.updateNaIdx();
          });
        });
      },
      updateNaIdx() {
        this.naIdxList = [];
        for (
          var i = 0;
          i < this.originDataNa.data.length;
          i++
        ) {
          for (
            var j = 0;
            j < this.originDataNa.column.length;
            j++
          ) {
            if (
              this.originDataNa.data[i][
                this.originDataNa.column[j].name
              ] === null
            ) {
              this.naIdxList.push({ i, j });
            }
          }
        }
      },
      isNaIdx(iIdx, jIdx) {
        var isContain = this.naIdxList.filter(
          (e) => e.i === iIdx && e.j === jIdx
        );
        return isContain.length > 0;
      },
      restore() {
        this.isLoading = true;
        this.data = this.originDataNa;
        this.isLoading = false;
      },
      runNa() {
        this.isLoading = true;
        this.RUN_NA({
          method: this.selectedMethod,
          idxCol: this.idxCol,
          request: this.originData,
        }).then((res) => {
          this.data = res.run;
          this.saveData = res.save;
          this.isLoading = false;
        });
      },
      save() {
        this.isLoading = true;
        this.UPDATE_DATA({
          datasetId: this.datasetId,
          request: this.saveData,
        }).then(() => {
          this.findNa();
        });
      },
    },
    created() {
      this.findNa();
    },
  };
  </script>
  
  <style scoped>
  .model-check-control {
    height: 100%;
  }
  table {
    color: #e8e8e8;
    font-weight: 300;
    text-align: center;
    font-size: 16px;
    border: 1.5px solid #545454;
  }
  th {
    height: 35px;
    font-size: 17px;
    font-weight: 400;
    background-color: #2c2c2c;
  }
  td {
    border: 0.5px solid #353535;
    height: 30px;
    width: 12%;
  }
  
  .data-description {
    color: #e8e8e8;
    font-weight: 300;
    margin-bottom: 5px;
  }
  .data-container {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 35px);
  }
  .table-container {
    overflow: auto;
    width: 65%;
  }
  
  .action-container {
    margin-right: 20px;
    padding: 20px;
    position: relative;
    border: 0.8px solid rgba(109, 109, 109, 0.306);
    background-color: rgba(255, 255, 255, 0.014);
    border-radius: 15px;
    width: 250px;
    margin-left: 10px;
  }
  .loading {
    margin-top: 30px;
    width: 65%;
  }
  .method-label {
    color: #e8e8e8;
    margin-bottom: 10px;
  }
  .method-select {
    background-color: rgb(39, 39, 39);
    color: #e8e8e8;
    font-size: 16px;
    padding: 10px;
  }
  .btn-container {
    width: 250px;
    padding-right: 20px;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
  }
  .btn-container button {
    width: 70px;
    font-size: 18px;
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
  
  .restore-btn,
  .run-btn {
    background-color: #373737;
  }
  .restore-btn:hover,
  .run-btn:hover {
    background-color: #464646;
  }
  .save-btn {
    background-color: #3f8ae2;
  }
  .save-btn:hover {
    background-color: #2f6cb1;
  }
  .na-td {
    border: 1px double #ae2f2f;
  }
  .datetime-td {
    border: 1.5px solid #545454;
    background-color: #2c2c2c;
    border: none;
  }
  </style>
  