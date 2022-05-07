<template>
  <navbar class="navbar-fixed" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.navbar-fixed {
  position: absolute;
  width: 100%;
}


</style>