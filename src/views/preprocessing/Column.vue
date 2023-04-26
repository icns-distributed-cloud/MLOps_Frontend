<template>
  <div class="main">
    <div class="header">
      <div class="title">속성 엔지니어링</div>
      <SelectedData
        v-if="showData"
        @changeDataset="changeDataset"
      />
    </div>
    <div class="content">
      <ColumnEngineeringControl
        v-if="showData"
        @close="closeMissingValueControl"
        :originDatasetId="originDatasetId"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
      @submit="submitDatasetSelectModal"
    >
      <template slot="description">
        <div class="description">
          속성 엔지니어링을 실행 할 원본 데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import SelectedData from "@/components/common/SelectedData";
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import ColumnEngineeringControl from "@/components/preprocessing/Column-engineering/ColumnEngineeringControl.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DatasetSelectModal,
    ColumnEngineeringControl,
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
    submitDatasetSelectModal(selectedId) {
      this.showDatasetSelectModal = false;
      this.originDatasetId = selectedId;
      this.showData = true;
    },
    closeDatasetSelectModal() {
      this.showDatasetSelectModal = false;
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
