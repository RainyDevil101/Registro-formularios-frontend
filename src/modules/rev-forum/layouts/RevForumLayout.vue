<template>
  <rev-navbar class="navbar-fixed" />

  <div v-if="statusState === 'CARGANDO'">
    <loader />
  </div>

  <div v-else class="forum-view">
    <rev-forum-list/>
  </div>
</template>

<script>
import RevNavbar from "../../../components/RevNavbar.vue";
import useAuth from '../../auth/composables/useAuth';
import getTerm from "../composables/forumTerm";
import RevForumList from '../views/RevForumList.vue';
import Loader from "../../../components/Loader.vue";
import { onBeforeUpdate, onActivated } from '@vue/runtime-core';

export default {
  components: { RevNavbar, RevForumList, Loader },

  setup() {

    const { getForums } = useAuth();
    const { statusState } = getTerm();

    // onBeforeUpdate(() => {
    //   console.log('a');
    //   getForums();
    // })

    onActivated(() => {
      getForums();
    })


    return {
      statusState,
    };
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  width: 90%;
  margin-left: 5%;
  padding-top: 20px;
  padding-bottom: 10px;
}

.navbar-fixed {
  position: absolute;
  width: 100%;
}

</style>