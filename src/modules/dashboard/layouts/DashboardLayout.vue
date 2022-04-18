<template>
  <rev-navbar class="navbar-fixed" />
  <div class="menu-view">
    <router-view />
  </div>
</template>

<script>
import { onActivated } from '@vue/runtime-core';
import RevNavbar from "../../../components/RevNavbar.vue";
import useAuth from "../../auth/composables/useAuth";
export default {
  components: { RevNavbar },

  setup() {

    const { getForums } = useAuth();

    onActivated(() => {
      console.log('getForums');
      getForums();
    })

    return {

    };
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