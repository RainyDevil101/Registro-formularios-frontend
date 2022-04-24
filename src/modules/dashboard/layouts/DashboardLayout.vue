<template>

  <loader v-if="statusStateA === 'CARGANDO'" />

  <div v-else>
    <rev-navbar class="navbar-fixed" />
    <div class="menu-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import RevNavbar from "../../../components/RevNavbar.vue";
import useAuth from "../../auth/composables/useAuth";
import Loader from '../../../components/Loader.vue';
import getForms from '../composables/gets';
export default {
  components: { RevNavbar, Loader },

  setup() {

    const { getForums } = useAuth();
    const { statusStateA } = getForms();

    getForums();

    return {
      statusStateA,
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