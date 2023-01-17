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
        :predatasetId="predatasetId"
      />
    </div>
    <DatasetSelectModal
        v-if="showDatasetSelectModal"
        @close="closeDatasetSelectModal"
        :datasetId="datasetId"
      >
        <template slot="description">
          <div class="description">
            모델훈련을 실행 할 원본 데이터셋을 선택하세요.
          </div>
        </template>
      </DatasetSelectModal>

      <PreDatasetSelectModal
        v-if="showPreDatasetSelectModal"
        @close="closePreDatasetSelectModal"
        :datasetId="datasetId"
      >
        <template slot="description">
          <div class="description">
            모델훈련을 실행 할 데이터셋 버전을 선택하세요.
          </div>
        </template>
      </PreDatasetSelectModal>
  </div>
</template>

<script>
import SelectedData from "@/components/common/SelectedData";
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import PreDatasetSelectModal from "@/components/common/PreDatasetSelectModal";
import MissingValueControl from "@/components/preprocessing/MissingValueControl";

export default {
  components: {
    DatasetSelectModal,
    MissingValueControl,
    SelectedData,
    PreDatasetSelectModal,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      showPreDatasetSelectModal: false,
      datasetId: 0,
      predatasetId: 0,
      showData: false,
    };
  },
  methods: {
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.showPreDatasetSelectModal = true;
    },
    closePreDatasetSelectModal(datasetId) {
      this.showPreDatasetSelectModal = false;
      this.predatasetId = datasetId;
      console.log(this.predatasetId);
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
