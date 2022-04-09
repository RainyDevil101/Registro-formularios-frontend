<template>
  <rev-navbar class="navbar-fixed" />
  <div class="menu-view">
    <router-view />
  </div>
</template>

<script>
import RevNavbar from "../../../components/RevNavbar.vue";
export default {
  components: { RevNavbar },

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

.navbar-fixed {
  position: absolute;
  width: 100%;
}


</style>