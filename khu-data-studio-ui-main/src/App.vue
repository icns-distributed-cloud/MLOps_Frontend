<template>
  <div id="app">
    <Gnb />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Gnb from "@/components/navigation/Gnb";
export default {
  components: { Gnb },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
  },
  created() {
    this.FETCH_DATASETS();
  },
};
</script>

<style>
html,
body {
  background-color: #252525;
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-family: "Noto Sans KR", sans-serif;
}
#app {
  display: flex;
}
</style>
