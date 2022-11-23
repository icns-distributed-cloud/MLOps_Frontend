<template>
  <div class="datalist-container">
    <div class="table-container">
      <table>
        <thead>
          <th>Name</th>
          <th>Host</th>
          <th>Port</th>
          <th>Database</th>
          <th>Table</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr
            v-for="dataset in getDatasets"
            :key="dataset.id"
          >
            <td class="name">{{ dataset.name }}</td>
            <td>{{ dataset.host }}</td>
            <td>{{ dataset.port }}</td>
            <td>{{ dataset.db }}</td>
            <td>{{ dataset.tableName }}</td>
            <td class="action">
              <button
                class="show-btn"
                @click="
                  openDatasetPreviewModal(
                    dataset.id,
                    dataset.name
                  )
                "
              >
                <font-awesome-icon
                  icon="fa-solid fa-table"
                />열람
              </button>
              <button
                class="edit-btn"
                @click="openDatasetUpdateModal(dataset.id)"
              >
                <font-awesome-icon icon="fa-solid fa-pen" />
                수정
              </button>
              <button
                class="delete-btn"
                @click="
                  openDatasetDeleteModal(
                    dataset.id,
                    dataset.name
                  )
                "
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
      :datasetId="datasetId"
      :datasetName="datasetName"
    />
    <DatasetPreviewModal
      v-if="showDatasetPreviewModal"
      @close="closeDatasetPreviewModal"
      :datasetId="datasetId"
      :datasetName="datasetName"
    />
  </div>
</template>

<script>
import DatasetUpdateModal from "@/components/dataset/DatasetUpdateModal";
import DatasetDeleteModal from "@/components/dataset/DatasetDeleteModal";
import DatasetPreviewModal from "@/components/dataset/DatasetPreviewModal";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DatasetUpdateModal,
    DatasetDeleteModal,
    DatasetPreviewModal,
  },
  data() {
    return {
      showDatasetUpdateModal: false,
      showDatasetDeleteModal: false,
      showDatasetPreviewModal: false,
      dataset: {},
      datasetId: 0,
      datasetName: "",
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASET"]),
    openDatasetUpdateModal(datasetId) {
      this.FETCH_DATASET(datasetId).then((res) => {
        this.dataset = res;
        this.showDatasetUpdateModal = true;
      });
    },
    closeDatasetUpdateModal() {
      this.showDatasetUpdateModal = false;
    },
    openDatasetDeleteModal(datasetId, datasetName) {
      this.datasetId = datasetId;
      this.datasetName = datasetName;
      this.showDatasetDeleteModal = true;
    },
    closeDatasetDeleteModal() {
      this.showDatasetDeleteModal = false;
    },
    openDatasetPreviewModal(datasetId, datasetName) {
      this.datasetId = datasetId;
      this.datasetName = datasetName;
      this.showDatasetPreviewModal = true;
    },
    closeDatasetPreviewModal() {
      this.showDatasetPreviewModal = false;
    },
  },
  computed: {
    ...mapGetters("dataset", ["getDatasets"]),
  },
};
</script>

<style scoped>
.datalist-container {
  height: calc(100% - 30px);
}
.table-container {
  padding-top: 10px;
  overflow: auto;
  height: calc(100% - 50px);
}
table {
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  width: 100%;
}
th {
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
}
td {
  border: 1px solid #353535;
  height: 30px;
  width: 12%;
}

.name {
  min-width: 200px;
}
.action {
  min-width: 190px;
}
.action button {
  padding: 5px;
  width: 60px;
  margin: 5px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
}
.show-btn {
  border: 1px solid rgb(157, 157, 157);
  color: rgb(157, 157, 157);
}
.show-btn svg {
  margin-right: 3px;
}

.edit-btn {
  border: 1px solid rgb(48, 119, 181);
  color: rgb(48, 119, 181);
}
.delete-btn {
  color: rgb(206, 54, 54);
  border: 1px solid rgb(206, 54, 54);
}
.delete-btn svg {
  margin-right: 3px;
}

.action button:hover {
  background-color: rgba(181, 181, 181, 0.182);
}
</style>
