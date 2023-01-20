<template>
  <div class="selected-data">
    <div>{{ dataset.name }}</div>
    <div class="change-btn-container">
      <button @click="changeDataset">데이터셋 변경</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dataset: {},
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
    changeDataset() {
      this.FETCH_DATASETS({
        userId: this.userId
      }).then(() => {
        this.$emit("changeDataset");
      });
    },
  },
  computed: {
    ...mapGetters("login", ["userId"])
  },
};
</script>

<style scoped>
.selected-data {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.064);
  margin-left: 20px;
  padding: 5px;
  padding-left: 10px;
  color: #e8e8e8;
  border-radius: 10px;
}
.change-btn-container {
  display: flex;
}
button {
  padding: 3px 5px;
  font-size: 12px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
}

button:hover {
  background-color: #2f6cb1;
}
</style>
