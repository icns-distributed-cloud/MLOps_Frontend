<template>
  <div class="main">
    <div class="header">
      <div class="header-first">
        <div class="title">통계</div>
        <SelectedData
          v-if="showContent"
          :datasetId="datasetId"
          @changeDataset="changeDataset"
        />
      </div>
      <SelectPeriod />
    </div>
    <div class="content">
      <StatisticContent
        v-if="showContent"
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
          데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import SelectedData from "@/components/common/SelectedData";
import StatisticContent from "@/components/statistic/StatisticContent";
import SelectPeriod from "@/components/statistic/SelectPeriod";

export default {
  components: {
    DatasetSelectModal,
    StatisticContent,
    SelectPeriod,
    SelectedData,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      datasetId: 0,
      showContent: false,
    };
  },
  methods: {
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.showContent = true;
    },
    changeDataset() {
      this.showContent = false;
      this.showDatasetSelectModal = true;
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
  padding-right: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}
.header-first {
  display: flex;
  align-items: center;
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
