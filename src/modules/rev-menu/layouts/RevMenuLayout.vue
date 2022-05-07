<template>
  <rev-navbar class="navbar-fixed" />
  <div class="rev-menu">
    <div class="menu-view">
      <router-view />
    </div>
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
.rev-menu {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.menu-view {
  border: 1px solid white;
}

.navbar-fixed {
  position: absolute;
  width: 100%;
}

</style>