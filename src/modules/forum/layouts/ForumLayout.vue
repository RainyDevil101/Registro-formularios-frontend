<template>
  <navbar />
  <div class="forum-view">
    <router-view />
  </div>
</template>

<script>
import Navbar from "../../../components/Navbar.vue";
export default {
  components: { Navbar },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  padding-top: 20px;
  padding-bottom: 10px;
}


</style>