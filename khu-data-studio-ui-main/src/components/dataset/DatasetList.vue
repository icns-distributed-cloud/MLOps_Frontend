<template>
  <div class="dataset-list-root">
    <div class="table-container">
      <table>
        <thead>
          <th>데이터셋</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr
            v-for="dataset in getDatasets"
            :key="dataset.id"
          >
            <td class="name">{{ dataset.name }}</td>
            <td class="action">
              <button
                class="show-btn"
                @click="openDatasetPreviewModal(dataset)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-table"
                />데이터 열람
              </button>
              <button
                class="add-data-btn"
                @click="openDatasetAddDataModal(dataset)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-plus"
                />데이터 추가
              </button>
              <button
                class="edit-btn"
                @click="openDatasetUpdateModal(dataset)"
              >
                <font-awesome-icon icon="fa-solid fa-pen" />
                수정
              </button>
              <button
                class="delete-btn"
                @click="openDatasetDeleteModal(dataset)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-trash-can"
                />삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DatasetUpdateModal
      v-if="showDatasetUpdateModal"
      @close="closeDatasetUpdateModal"
      :dataset="dataset"
    />
    <DatasetDeleteModal
      v-if="showDatasetDeleteModal"
      @close="closeDatasetDeleteModal"
      :dataset="dataset"
    />
    <DatasetPreviewModal
      v-if="showDatasetPreviewModal"
      @close="closeDatasetPreviewModal"
      :dataset="dataset"
    />
    <DatasetAddDataModal
      v-if="showDatasetAddDataModal"
      @close="closeDatasetAddDataModal"
      :dataset="dataset"
    />
  </div>
</template>

<script>
import DatasetUpdateModal from "@/components/dataset/modal/DatasetUpdateModal";
import DatasetDeleteModal from "@/components/dataset/modal/DatasetDeleteModal";
import DatasetPreviewModal from "@/components/dataset/modal/DatasetPreviewModal";
import DatasetAddDataModal from "@/components/dataset/modal/DatasetAddDataModal";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DatasetUpdateModal,
    DatasetDeleteModal,
    DatasetPreviewModal,
    DatasetAddDataModal,
  },
  computed: {
    ...mapGetters("dataset", ["getDatasets"]),
  },
  data() {
    return {
      showDatasetUpdateModal: false,
      showDatasetDeleteModal: false,
      showDatasetPreviewModal: false,
      showDatasetAddDataModal: false,
      dataset: {},
      datasetId: 0,
      datasetName: "",
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASET"]),
    openDatasetUpdateModal(dataset) {
      this.dataset = dataset;
      this.showDatasetUpdateModal = true;
    },
    closeDatasetUpdateModal() {
      this.showDatasetUpdateModal = false;
    },
    openDatasetDeleteModal(dataset) {
      this.dataset = dataset;
      this.showDatasetDeleteModal = true;
    },
    closeDatasetDeleteModal() {
      this.showDatasetDeleteModal = false;
    },
    openDatasetPreviewModal(dataset) {
      this.dataset = dataset;
      this.showDatasetPreviewModal = true;
    },
    closeDatasetPreviewModal() {
      this.showDatasetPreviewModal = false;
    },
    openDatasetAddDataModal(dataset) {
      this.dataset = dataset;
      this.showDatasetAddDataModal = true;
    },
    closeDatasetAddDataModal() {
      this.showDatasetAddDataModal = false;
    },
  },
};
</script>

<style scoped>
.dataset-list-root {
  height: 90%;
  display: flex;
  justify-content: center;
}
.table-container {
  display: flex;
  justify-content: center;
  height: calc(100% - 30px);
  width: calc(100% - 20px);
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
</style>