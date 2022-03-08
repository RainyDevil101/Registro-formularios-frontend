<template>
  <div class="user-list-container">
    <div class="px-4 my-1">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar usuario"
        v-model="term"
      />
    </div>

    <div class="user-scrollarea">
      <user
        v-for="user of userRef"
        :key="user.uid"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";

import getTerm from "../composables/userTerm";
import User from './User.vue';

export default {
  components: { User },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const idUS = ref("");
    const term = ref("");

    const { searchTerm, userRef } = getTerm(term.value);

    watch(
      () => term.value,
      () => searchTerm(term.value)
    );
    watch(
      () => route.params.id,
      () => (idUS.value = route.params.id)
    );
    watch(
      () => idUS.value,
      () => searchTerm(term.value)
    );

    return {
      searchTerm,
      term,
      userRef,
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