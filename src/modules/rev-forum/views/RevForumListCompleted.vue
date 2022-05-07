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
        v-if="forumsCompletedRef.length > 0"
        v-for="forumCompleted of forumsCompletedRef"
        :key="forumCompleted._id"
        :forumCompleted="forumCompleted"
        />
        <div v-else class="red">No hay registros</div>
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
    display: block;
    // background-color: blue;
    height: 82vh;
}

.red {
    background-color: white;
    text-align: center;
    padding: 5px 0px 5px 0px;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    border-radius: 4px;
}

.forum-scrollarea {
        min-width: 330px;
    width: 50vw;
    height: 92%;
    overflow: auto;
    overflow-x: hidden;
}

</style>