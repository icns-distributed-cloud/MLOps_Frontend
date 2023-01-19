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
        @close="closeMissingValueControl"
        :originDatasetId="originDatasetId"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
    >
      <template slot="description">
        <div class="description">
          모델훈련을 실행 할 원본 데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import SelectedData from "@/components/common/SelectedData";
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import MissingValueControl from "@/components/preprocessing/MissingValueControl";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DatasetSelectModal,
    MissingValueControl,
    SelectedData,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      showPreDatasetSelectModal: false,
      originDatasetId: 0,
      predatasetId: 0,
      showData: false,
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
    closeDatasetSelectModal(selectedId) {
      this.showDatasetSelectModal = false;
      this.originDatasetId = selectedId;
      this.showData = true;
    },
    changeDataset() {
      this.showDatasetSelectModal = true;
      this.showData = false;
    },
    closeMissingValueControl(){
      this.FETCH_DATASETS({userId:this.userId})
      this.changeDataset();
    }
  },
  computed: {
    ...mapGetters("login", ["userId"])
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
