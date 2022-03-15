<template>
    <nav class="navbar navbar-dark bcc">
        <div class="container-fluid">
            <div class>
                <a @click="menu" class="pointer nav-btn navbar-brand">
                    <b>Revisor</b>
                </a>
                <a @click="lista" class="pointer nav-btn navbar-brand">
                    <b>Pendientes</b>
                </a>
                <a @click="usuario" class="pointer nav-btn navbar-brand">
                    <b>Usuarios</b>
                </a>
                <a @click="onShowAn" class="nav-btn navbar-brand pointer">
                    <b>Anverso ART</b>
                </a>
                <a @click="onShowRe" class="nav-btn navbar-brand pointer">
                    <b>Reverso ART</b>
                </a>
            </div>
            <button class="logout" @click="onLogOut">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import useAuth from '../modules/auth/composables/useAuth';
import { useStore } from 'vuex';
export default {
    setup() {

        const router = useRouter();
        const store = useStore();
        const { logOut } = useAuth();

        const onImgAn = ref(false);
        const onImgRe = ref(false);

        return {
            onImgAn,
            onImgRe,

            onShowAn: () => {

                if (onImgAn.value === false) {
                    onImgAn.value = true
                    onImgRe.value = false
                    return store.dispatch('forums/changeImgAn', onImgAn.value)
                }
                if (onImgAn.value === true) {
                    console.log('b');
                    onImgAn.value = false
                    return store.dispatch('forums/changeImgAn', onImgAn.value)
                }
            },

            onShowRe: () => {
                if (onImgRe.value === false) {
                    onImgRe.value = true
                    onImgAn.value = false
                    return store.dispatch('forums/changeImgRe', onImgRe.value)
                }
                if (onImgRe.value === true) {
                    onImgRe.value = false
                    return store.dispatch('forums/changeImgRe', onImgRe.value)
                }
            },


            onLogOut: () => {
                router.push({ name: "select-login" });
                logOut();
            },
            menu: () => {
                router.push({ name: 'rev-front-menu' })
            },
            lista: () => {
                router.push({ name: 'rev-list-forum' })
            },
            usuario: () => {
                router.push({ name: 'user-view-create' })
            },
        }

    }
}
</script>

<style lang="scss" scoped>
.bcc {
    background-color: rgba($color: red, $alpha: 0.3);
}

.logout {
    height: 40px;
    width: 40px;
    background-color: black;
    border: none;
    text-decoration: none;
    border-radius: 50%;
    font-size: 24px;
    color: white;
    transition: 0.3s;

    &:hover {
        background-color: white;
        color: black;
    }
}

@media (max-width: 440px) {
    .nav-btn {
        font-size: 13px;
    }
}
</style>