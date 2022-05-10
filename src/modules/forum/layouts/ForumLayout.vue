<template>

  <div  v-if="taskReady === false">
    <loader />
  </div>

  <div v-else>
    <navbar class="navbar-fixed" />
    <div class="forum-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "../../../components/Navbar.vue";
import Loader from "../../../components/Loader.vue";
import useAuth from "../../auth/composables/useAuth";
export default {
  components: { Navbar, Loader },

  setup() {

    const { taskReady } = useAuth();

    return {
      taskReady
    };
  },
};
</script>

<style lang="scss" scoped>

.navbar-fixed {
  position: fixed;
  width: 100%;
}
</style>