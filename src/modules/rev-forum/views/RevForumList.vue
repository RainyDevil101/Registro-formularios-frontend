<template>
    <div class="up">

        <div v-if="forumsRef === ''" class="forumnt">
            <no-forums />
        </div>

        <div v-if="authStatus === 'RECIBIDOS'">
            <loader />
        </div>

        <div v-if="forumsRef !== ''" class="view">
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
                <forum v-if="forumsRef.length > 0"  v-for="forum of forumsRef" :key="forum._id" :forum="forum" />
                <div v-else class="red">No hay registros</div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onActivated, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';

import getTerm from '../composables/forumTerm';
import Forum from '../components/RevForum.vue';
import Loader from '../../../components/Loader.vue';
import { useRouter } from 'vue-router';
import NoForums from '../components/NoForums.vue';

export default {

    components: { Forum, Loader, NoForums },

    setup() {

        const store = useStore();
        const router = useRouter();

        const term = ref('');

        // const pendingPush = () => {
        //     if ( forumsRef.value == '' ) {
        //         router.push({ 'name': 'no-forums'})
        //         return
        //     }
        // }

        const { forumsRef, forumsTerm, authStatus } = getTerm(term.value);

        watch(
            () => term.value,
            () => forumsTerm(term.value)
        );

        watch(
            () => store.state.forums.forumsPending,
            () => forumsTerm(term.value)
        );

        // watch(
        //     () => forumsRef.value,
        //     () => pendingPush()
        // );

        return {
            term,
            forumsRef,
            authStatus,
            // pendingPush,
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