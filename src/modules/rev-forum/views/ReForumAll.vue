<template>

<div class="up">
    <div v-if="allState === 'CARGANDO'">
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
        <all-forum
        v-for="allForums of allForumsRef"
        :key="allForums._id"
        :allForums="allForums"
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
import Loader from '../../../components/Loader.vue';
import AllForum from '../components/AllForum.vue';

export default {

    components: { Loader, AllForum },

    setup() {

        const store = useStore();

        const term = ref('');

        const { allForumsRef, allForumsTerm, allState } = getTerm(term.value);

        watch(
            () => term.value,
            () => allForumsTerm(term.value)
        );

        watch(
            () => store.state.forums.allForums,
            () => allForumsTerm(term.value)
        );

        return {
            term,
            allForumsRef,
            allState,
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
    overflow: auto;
    overflow-x: hidden;
}

.up {
  margin-top: 3.5rem;
}

</style>