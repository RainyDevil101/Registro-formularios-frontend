<template>

<div class="up">
    <div v-if="completedState === 'CARGANDO'">
    <loader />
</div>

<div class="rev-forum-container">
    <div class="px-4 my-1">
        <input
        type="text"
        class="form-control"
        placeholder="Buscar formularios"
        v-model="term"
        />
    </div>

    <div class="forum-scrollarea">
        <rev-forum-completed
        v-for="forumCompleted of forumsCompletedRef"
        :key="forumCompleted._id"
        :forumCompleted="forumCompleted"
        />
    </div>
</div>
</div>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

import getTerm from '../composables/forumTerm';
import RevForumCompleted from '../components/RevForumCompleted.vue';
import Loader from '../../../components/Loader.vue';

export default {

    components: { Loader, RevForumCompleted },

    setup() {

        const store = useStore();

        const term = ref('');

        const { forumsCompletedRef, forumsCompletedTerm, completedState } = getTerm(term.value);

        watch(
            () => term.value,
            () => forumsCompletedTerm(term.value)
        );

        watch(
            () => store.state.forums.forumsCompleted,
            () => forumsCompletedTerm(term.value)
        );

        return {
            term,
            forumsCompletedRef,
            completedState,
        }
    }

}

</script>

<style lang="scss" scoped>

.rev-forum-container {
    height: calc(100vh - 165px);
}

.forum-scrollarea {
    height: 94%;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
}

.up {
    margin-top: 3rem;
}

</style>