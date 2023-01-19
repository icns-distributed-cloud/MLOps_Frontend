<template>
  <div class="dataset-list-root">
    <div v-if="isLoading" class="loading">
          <Spinner />
    </div>
    <div class="table-container" v-if="!showMissingPreProcessingModal">
      <table>
        <thead>
          <th>데이터셋</th>
          <th>Action</th>
        </thead>
        <tbody>
          <template v-for="dataset in Predatasets" >
            <tr
                :key="dataset.id"
                v-if="dataset.datasetType < 2"
            >
              <td class="name">{{ dataset.name }}</td>
              <td class="action">
                <button
                  class="pre-btn"
                  @click="openshowMissingPreProcessingModal(dataset)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-table"
                  />결측치 처리하기
                </button>
                <button
                  class="show-btn"
                  @click="openDatasetPreviewModal(dataset)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-table"
                  />데이터 확인
                </button>
                <!--<button
                  class="add-data-btn"
                  @click="openDatasetAddDataModal(dataset)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-plus"
                  />데이터 추가
                </button>-->
                <button
                  class="edit-btn"
                  @click="openPreDatasetUpdateModal(dataset)"
                >
                  <font-awesome-icon icon="fa-solid fa-pen" />
                  수정
                </button>
                <button
                  class="delete-btn"
                  @click="openPreDatasetDeleteModal(dataset)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-trash-can"
                  />삭제
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <PreDatasetUpdateModal
      v-if="showPreDatasetUpdateModal"
      @close="closePreDatasetUpdateModal"
      :dataset="SelectedDataset"
      :userId="userId"
    />
    <DatasetDeleteModal
      v-if="showPreDatasetDeleteModal"
      @close="closePreDatasetDeleteModal"
      :dataset="SelectedDataset"
    />
    <DatasetPreviewModal
      v-if="showDatasetPreviewModal"
      @close="closeDatasetPreviewModal"
      :dataset="SelectedDataset"
    />
    <MissingPreProcessingModal
      v-if="showMissingPreProcessingModal"
      @close="closeshowMissingPreProcessingModal"
      :dataset="SelectedDataset"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
import DatasetDeleteModal from "@/components/dataset/modal/DatasetDeleteModal";
import PreDatasetUpdateModal from "@/components/dataset/modal/PreDatasetUpdateModal";
import DatasetPreviewModal from "@/components/dataset/modal/DatasetPreviewModal";
import MissingPreProcessingModal from "@/components/preprocessing/MissingPreProcessingModal";
export default {
  props: ["originDatasetId"],
  components: {
    Spinner,
    DatasetDeleteModal,
    PreDatasetUpdateModal,
    DatasetPreviewModal,
    MissingPreProcessingModal,
  },
  data() {
    return {
      isLoading: true,
      Predatasets: [],
      showPreDatasetUpdateModal: false,
      showPreDatasetDeleteModal: false,
      showDatasetPreviewModal: false,
      showMissingPreProcessingModal: false,
      SelectedDataset: [],
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_PREDATASETS"]),
    close() {
      this.$emit("close");
    },
    getData() {
      this.FETCH_PREDATASETS({
        originDatasetId: this.originDatasetId,
      }).then((res) => {
        if(res.data.length <= 0){this.close();} // 데이터를 모두 삭제해서 리스트에 아무것도 없는 경우 창 닫기
        this.isLoading = false;
        this.Predatasets = res.data.slice(1, );
        this.Predatasets.push(res.data[0]);
        this.Predatasets[this.Predatasets.length-1].name += "(Original)";
      });
    },
    openPreDatasetUpdateModal(dataset) {
      this.SelectedDataset = dataset;
      this.showPreDatasetUpdateModal = true;
    },
    closePreDatasetUpdateModal() {
      this.getData();
      this.showPreDatasetUpdateModal = false;
    },
    openPreDatasetDeleteModal(dataset) {
      this.SelectedDataset = dataset;
      this.showPreDatasetDeleteModal = true;
    },
    closePreDatasetDeleteModal() {
      this.getData();
      this.showPreDatasetDeleteModal = false;
    },
    openDatasetPreviewModal(dataset) {
      this.SelectedDataset = dataset;
      this.showDatasetPreviewModal = true;
    },
    closeDatasetPreviewModal() {
      this.getData();
      this.showDatasetPreviewModal = false;
    },
    openshowMissingPreProcessingModal(dataset) {
      this.SelectedDataset = dataset;
      this.showMissingPreProcessingModal = true;
    },
    closeshowMissingPreProcessingModal() {
      this.getData();
      this.showMissingPreProcessingModal = false;
    },
  },
  created() {
    this.getData();
  },
  computed:{
    ...mapGetters("login", ["userId"]),
  }
};
</script>

<style scoped>

.dataset-list-root {
  height: 90%;
  /*display: flex;*/
  justify-content: center;
  transition: opacity 0.3s ease;
}
.table-container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: 10px;
}
table {
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
  height: 60px;
}
td:first-child {
  border-right: none;
}
.name {
  min-width: 300px;
}
.action {
  padding: 0 20px;
  min-width: 620px;
}
.action button {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  margin: 5px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
  font-size: 15px;
}
button svg {
  margin-right: 6px;
}
.pre-btn {
  border: 1px solid rgb(30, 143, 30);
  color: rgb(30, 143, 30);
}
.show-btn {
  border: 1px solid rgb(157, 157, 157);
  color: rgb(157, 157, 157);
}
.add-data-btn {
  border: 1px solid rgb(76, 135, 90);
  color: rgb(76, 135, 90);
}
.edit-btn {
  border: 1px solid rgb(48, 119, 181);
  color: rgb(48, 119, 181);
}
.edit-btn svg {
  margin-right: 2px;
}
.delete-btn {
  color: rgb(206, 54, 54);
  border: 1px solid rgb(206, 54, 54);
}
.action button:hover {
  background-color: rgba(181, 181, 181, 0.065);
}
.loading {
  margin-top: 30px;
  width: 65%;
}
</style>
