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
import { useStore } from 'vuex';
import useAuth from "../../auth/composables/useAuth";
export default {
  components: { Navbar, Loader },

  setup() {

    const store = useStore();

    const { taskReady } = useAuth();

    return {
      taskReady
    };
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  padding-top: 20px;
  padding-bottom: 10px;
}

.navbar-fixed {
  position: absolute;
  width: 100%;
}
</style>