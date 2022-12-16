<template>
  <div>
    <LoginModal v-if="LoginModal_flag" @close="CloseLoginModal"></LoginModal>
  </div>
</template>

<script>
import LoginModal from "@/components/home/LoginModal";
export default { 
  data(){
    return{
    LoginModal_flag: true,
  }},
  components: { 
    LoginModal, 
  },
  methods: {
    CloseLoginModal(){
      this.LoginModal_flag=false;
    }
  },
  };
</script>

<style></style>
