<template>

<div class="up">
    <div v-if="statusStateA === 'CARGANDO'">
    <loader />
</div>

<div class="rev-forum-container">
    <div class="input-term px-4 my-1">
        <input
        type="text"
        class="form-control"
        placeholder="Buscar formularios"
        v-model="term"
        />
    </div>

    <div class="forum-scrollarea">
        <all-forum v-if="allForumsRef.length > 0"
        v-for="allForums of allForumsRef"
        :key="allForums._id"
        :allForums="allForums"
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
import Loader from '../../../components/Loader.vue';
import AllForum from '../components/AllForum.vue';

export default {

    components: { Loader, AllForum },

    setup() {

        const store = useStore();

        const term = ref('');

        const { allForumsRef, allForumsTerm, statusStateA } = getTerm(term.value);

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
            statusStateA,
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

.input-term {
    width: 100%;
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