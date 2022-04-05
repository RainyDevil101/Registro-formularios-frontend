<template>
    <div class="up">
        <div v-if="showAn === true">
            <div>
                <img-an :userAn="userAn" @on:close="onShowAn" />
            </div>
        </div>

        <div v-if="showRe === true">
            <div>
                <img-re :userRe="userRe" @on:closeRe="onShowRe" />
            </div>
        </div>

        <div v-if="onLoad === true">
            <loader />
        </div>
        <div v-else>
            <div class="testing">
                <p>{{forum}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ImgRe from "../components/imgRe.vue";
import ImgAn from "../components/imgAn.vue";
import Loader from '../../../components/Loader.vue';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import useIdForum from '../composables/forumId';

export default {
    components: { Loader, ImgRe, ImgAn },
    setup() {

        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const onLoad = ref(false);

        const { forum, userAn, userRe } = useIdForum();

        const showAn = ref(store.state.forums.ImgAn);
        watch(
            () => store.state.forums.imgAn,
            () => showAn.value = store.state.forums.imgAn
        );

        const showRe = ref(store.state.forums.ImgRe);
        watch(
            () => store.state.forums.imgRe,
            () => showRe.value = store.state.forums.imgRe
        );

        watch(
            () => store.state.forums.userNeeded,
            () => onLoading
        )

        const onLoading = () => {

            if (store.state.forums.userNeeded === '') {
                console.log(store.state.forums.userNeeeded);
                return onLoad.value = true
            } else {
                return onLoad.value = false
            }
        }

        return {
            showAn,
            showRe,
            userAn,
            userRe,
            onLoading,
            onLoad,
            forum,

            onShowAn: () => {

                return store.dispatch('forums/changeImgAn', false)

            },
            onShowRe: () => {

                return store.dispatch('forums/changeImgRe', false)

            },

        };
    },
};
</script>

<style lang="scss" scoped>
* {
    font-size: 14px;
}

p {
    margin: 0;
}

.up {
    margin-top: 3rem;
}

.testing {
    background-color: white;
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (max-width: 774px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>