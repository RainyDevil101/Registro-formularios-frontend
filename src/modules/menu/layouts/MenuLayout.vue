<template>
  <navbar />
  <div class="menu-view">
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
.menu-view {
  padding-top: 20px;
  padding-bottom: 10px;
}


</style>