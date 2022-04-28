<template>
  <user-navbar class="navbar-fixed" />

      <div v-if="onLoad === 'CARGANDO' || errorMessage === true">
      <loader />
    </div>

  <div v-else class="forum-view">
    <router-view />
  </div>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useIdForum from '../composables/forumId';
import UserNavbar from '../../../components/UserNavbar.vue';
import Loader from '../../../components/Loader.vue';

export default {
  components: { UserNavbar, Loader },

  setup() {

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const { errorMessage } = useIdForum();

    const onLoad = ref(store.state.forums.statusC);

    const getForumId = async () => {

      if (!route.params.id) {
        return
      }
      const forumNeeded = await store.dispatch('forums/getForum', route.params.id)
      return forumNeeded
    }

    watch(
      () => route.params.id,
      () => getForumId()
    )

    getForumId();

    return {
      getForumId,
      errorMessage,
      onLoad,
    };
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  display: block;
  padding-top: 10px;
  justify-content: center;
  overflow: auto;
}

.navbar-fixed {
  position: absolute;
  width: 100%;
}

@media (max-width: 774px) {
  
}
</style>