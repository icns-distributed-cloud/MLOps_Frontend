<template>
  <div id="app">
    <Gnb v-if="userId>0" />
      <!--<Gnb />-->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Gnb from "@/components/navigation/Gnb";
export default {
  data() {
      return {
      }
  },
  components: { Gnb },
  methods: {
    ...mapActions("dataset", ["FETCH_DATASETS"]),
    ...mapActions("login", ["DUMMY_LOGIN"])
  },
  created() {
    this.FETCH_DATASETS({
        userId: this.userId
      });
    this.DUMMY_LOGIN();
  },
  computed: {
    ...mapGetters("login", ["userId"]),
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
