<template>

<div v-if="onLoad === true">
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
        v-for="forum of forumRef"
        :key="forum._id"
        :forum="forum"
        />
    </div>
</div>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { watch } from '@vue/runtime-core';

import getForum from '../../gets/getForums';
import Forum from '../components/RevForum.vue';
import Loader from '../../../components/Loader.vue';

export default {

    components: { Forum, Loader },

    setup() {

        const route = useRoute();

        const idCT = ref('');
        const term = ref('');

        const { searchForum, forumRef, onLoad } = getForum(term.value);

        watch(
            () => term.value,
            () => searchForum(term.value)
        );

        return {
            searchForum,
            term,
            forumRef,
            idCT,
            onLoad,
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

</style>