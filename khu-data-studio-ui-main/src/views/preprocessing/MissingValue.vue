<template>
  <div class="main">
    <div class="header">
      <div class="title">결측치 처리</div>
      <SelectedData
        v-if="showData"
        :datasetId="datasetId"
        @changeDataset="changeDataset"
      />
    </div>
    <div class="content">
      <MissingValueControl
        v-if="showData"
        :datasetId="datasetId"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
      :datasetId="datasetId"
    >
      <template slot="description">
        <div class="description">
          전처리할 데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import SelectedData from "@/components/common/SelectedData";
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import MissingValueControl from "@/components/preprocessing/MissingValueControl";

export default {
  components: {
    DatasetSelectModal,
    MissingValueControl,
    SelectedData,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      datasetId: 0,
      showData: false,
    };
  },
  methods: {
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.showData = true;
    },
    changeDataset() {
      this.showDatasetSelectModal = true;
      this.showData = false;
    },
  },
};
</script>

<style scoped>
.main {
  width: calc(100% - 220px);
}
.header {
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 70px;
}
.title {
  color: #bcbcbc;
  font-size: 25px;
  line-height: 70px;
}
.content {
  width: 95%;
  height: calc(100vh - 90px);
  background-color: #1e1e1e;
  border-radius: 10px;
  margin: 20px auto;
  margin-top: 0px;
  box-sizing: border-box;
  padding: 15px;
}

.content-header {
  margin: 10px 20px;
  display: flex;
  justify-content: right;
}
</style>
