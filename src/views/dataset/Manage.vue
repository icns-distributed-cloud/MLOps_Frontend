<template>
  <div class="main">
    <div class="title">데이터셋 관리</div>
    <div class="content">
      <div class="content-header">
        <button class="add-btn" @click="openDataAddModal">
          데이터셋 등록
        </button>
      </div>

      <DatasetList />
      <DatasetAddModal
        v-if="showDataAddModal"
        @close="closeDataAddModal"
      />
    </div>
  </div>
</template>

<script>
import DatasetList from "@/components/dataset/DatasetList";
import DatasetAddModal from "@/components/dataset/modal/DatasetAddModal";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    DatasetList,
    DatasetAddModal,
  },
  data() {
    return {
      showDataAddModal: false,
    };
  },
  computed: {
    ...mapGetters("login", ["userId"]),
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS"
    ]),
    openDataAddModal() {
      this.showDataAddModal = true;
    },
    closeDataAddModal() {
      this.showDataAddModal = false;
    },
  },
  created(){
    console.log("Manage", this.userId)
    this.FETCH_DATASETS({
      userId: this.userId
    });
  }
};
</script>

<style scoped>
.main {
  width: calc(100% - 220px);
}
.title {
  color: #bcbcbc;
  font-size: 25px;
  height: 50px;
  line-height: 70px;
  padding-left: 20px;
}
.content {
  width: 95%;
  height: calc(100vh - 90px);
  background-color: #1e1e1e;
  border-radius: 10px;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 15px;
}

.content-header {
  margin: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: right;
}

.add-btn {
  width: 190px;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
  margin-right: 30px;
}

.add-btn:hover {
  background-color: #2f6cb1;
}
</style>
