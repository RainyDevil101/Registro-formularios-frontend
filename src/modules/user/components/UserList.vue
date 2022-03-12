<template>

  <div class="user-list-container">
    <div class="px-4 my-1">
      <input type="text" class="form-control" placeholder="Buscar usuario" v-model="term" />
    </div>

    <div class="user-scrollarea">
      <user v-for="user of usersRef" :key="user" :user="user" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { watch } from "vue";

import getTerm from "../composables/userTerm";
import User from './User.vue';
import Loader from '../../../components/Loader.vue';
import { useStore } from 'vuex';

export default {
  components: { User, Loader },

  setup() {

    const term = ref('');
    const store = useStore();

    const { usersTerm, usersRef } = getTerm(term.value);

    watch(
      () => term.value,
      () => usersTerm(term.value)
    );

    watch(
      () => store.state.users.users,
      () => usersTerm(term.value)
    );

    return {

      term,
      usersRef,

    };
  },
};
</script>

<style lang="scss" scoped>
.user-list-container {
  height: calc(100vh - 200px);
}

.user-scrollarea {
  height: 94%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
}

@media screen and (max-width: 768px) {
}
</style>