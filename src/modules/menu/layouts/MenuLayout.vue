<template>

  <loader v-if="loading === 'AUTHENTICATING'"/>

  <div v-else>
    <navbar class="navbar-fixed" />
    <div class="menu-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "../../../components/Navbar.vue";
import Loader from "../../../components/Loader.vue";
import { useStore } from 'vuex';
import { ref } from '@vue/reactivity';
export default {
  components: { Navbar, Loader },

  setup() {

    const store = useStore();

    const loading = ref(store.state.auth.status)

    return {
      loading,
    };
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