<template>
    <nav class="navbar navbar-expand-lg navbar-dark bcc">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 txt-c">
                    <li class="nav-item box-a">
                        <a @click="menu" class="nav-link active pointer">
                            <b>Menu</b>
                        </a>
                    </li>
                    <li class="nav-item box-a">
                        <a @click="dashboard" class="nav-link active pointer">
                            <b>Dashboard</b>
                        </a>
                    </li>
                    <li class="nav-item box-a">
                        <a @click="all" class="nav-link active pointer">
                            <b>Todas</b>
                        </a>
                    </li>
                    <li class="nav-item box-a">
                        <a @click="revisadas" class="nav-link active pointer">
                            <b>Revisadas</b>
                        </a>
                    </li>
                    <li class="nav-item box-a">
                        <a @click="lista" class="nav-link active pointer">
                            <b>Pendientes</b>
                        </a>
                    </li>
                    <li class="nav-item box-a">
                        <a @click="usuario" class="nav-link active pointer">
                            <b>Usuarios</b>
                        </a>
                    </li>
                    <div v-show="imgBlocked === false">
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle box-a" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <b>Imagenes</b>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a @click="onShowAn" class="dropdown-item pointer">
                                        <b>Anverso ART</b>
                                    </a>
                                </li>
                                <li>
                                    <a @click="onShowRe" class="dropdown-item pointer">
                                        <b>Reverso ART</b>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </ul>
                <button class="logout" @click="onLogOut">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { watch } from '@vue/runtime-core';
import useAuth from '../modules/auth/composables/useAuth';
export default {
    setup() {

        const router = useRouter();
        const store = useStore();
        const { logOut } = useAuth();

        watch(
            () => store.state.forums.imgBlocked,
            () => (imgBlocked.value = store.state.forums.imgBlocked)
        )

        const imgBlocked = ref(store.state.forums.imgBlocked);

        const onImgAn = ref(store.state.forums.imgAn);
        const onImgRe = ref(store.state.forums.imgRe);

        return {
            onImgAn,
            onImgRe,
            imgBlocked,

            onShowAn: () => {

                if (onImgAn.value === false) {

                    return store.dispatch('forums/changeImgAn', true)
                }
                if (onImgAn.value === true) {

                    return store.dispatch('forums/changeImgAn', false)

                }
            },

            onShowRe: () => {
                if (onImgRe.value === false) {

                    return store.dispatch('forums/changeImgRe', true)

                }
                if (onImgRe.value === true) {

                    return store.dispatch('forums/changeImgRe', false)

                }
            },


            onLogOut: () => {
                router.push({ name: "select-login" });
                logOut();
            },
            menu: () => {
                router.push({ name: 'rev-front-menu' })
            },
            dashboard: () => {
                router.push({ name: 'dashboard-view' })
            },
            all: () => {
                router.push({ name: 'all-forums' })
            },
            lista: () => {
                router.push({ name: 'rev-list-forum' })
            },
            revisadas: () => {
                router.push({ name: 'rev-list-completed' })
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
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.txt-c {
    text-align: center;
}

nav .navbar-nav li a {
    color: white !important;
}

.dropdown-menu {
    align-content: center;
    text-align: center;
    background-color: rgba($color: rgb(0, 54, 105), $alpha: 1);
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

@media (min-width: 991px) {

    nav .navbar-nav li a {
        color: black !important;
    }

    .dropdown-menu li a {
        color: black !important;
    }

    .dropdown-menu {
        background-color: white;
    }

    .box-a {
        background-color: white;
        margin: 0px 4px 0px 4px;
        width: 120px;
        border-radius: 4px;

        &:hover {
            background-color: rgb(203, 203, 203);
        }
    }
}
</style>