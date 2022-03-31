<template>

<div class="up">
    <div v-if="authStatus === 'RECIBIDOS'">
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
        <forum
        v-for="forum of forumsRef"
        :key="forum._id"
        :forum="forum"
        />
    </div>
</div>
</div>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { watch } from '@vue/runtime-core';

import getTerm from '../composables/forumTerm';
import Forum from '../components/RevForum.vue';
import Loader from '../../../components/Loader.vue';
import { useStore } from 'vuex';

export default {

    components: { Forum, Loader },

    setup() {

        const route = useRoute();
        const store = useStore();

        const term = ref('');

        const { forumsRef, forumsTerm, authStatus } = getTerm(term.value);

        watch(
            () => term.value,
            () => forumsTerm(term.value)
        );

        watch(
            () => store.state.forums.forums,
            () => forumsTerm(term.value)
        );

        return {
            term,
            forumsRef,
            authStatus,
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