<template>
  <rev-navbar class="navbar-fixed" />

  <div v-if="statusState === 'CARGANDO'">
    <loader />
  </div>

  <div v-else class="forum-view">
    <router-view class="router-view" />
  </div>
</template>

<script>
import RevNavbar from "../../../components/RevNavbar.vue";
import useAuth from '../../auth/composables/useAuth';
import getTerm from "../composables/forumTerm";
import RevForumList from '../views/RevForumList.vue';
import Loader from "../../../components/Loader.vue";
import { onActivated } from '@vue/runtime-core';

export default {
  components: { RevNavbar, RevForumList, Loader },

  setup() {

    const { getForums } = useAuth();
    const { statusState } = getTerm();

    onActivated(() => {
      getForums();
    })

    getForums();

    return {
      statusState,
    };
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.navbar-fixed {
  position: absolute;
  width: 100vw;
}

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { 
//   .forum-view {
//     background-color: red;
//   }
//  }

// // Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { 
//   .forum-view {
//     background-color: blue;
//   }
//  }

// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) { 
//   .forum-view {
//     background-color: green;
//   }
//  }

// // X-Large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { 
//   .forum-view {
//     background-color: yellow;
//   }
//  }

// // XX-Large devices (larger desktops, 1400px and up)
// @media (min-width: 1400px) { 
//   .forum-view {
//     background-color: brown;
//   }
//  }

</style>