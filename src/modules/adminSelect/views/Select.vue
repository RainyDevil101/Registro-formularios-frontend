<template>
    <div class="container-select">
        <div class="selector">
            <button @click="onSup">Menú supervisores</button>
            <button @click="onRev">Menú revisores</button>
            <button @click="onOut">Salir</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useAuth from '../../auth/composables/useAuth';
export default {

    setup() {

        const router = useRouter();

        const { logOut } = useAuth();

        return {

            onOut: () => {
                router.push({ name: "select-login" });
                logOut();
            },
            onSup: () => {
                router.push({ name: 'front-menu' })
            },
            onRev: () => {
                router.push({ name: 'rev-front-menu' })
            },

        }
    }

}
</script>

<style lang="scss" scoped>
.container-select {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
}

.selector {
    border-radius: 4px;
    padding: 20px;
    background-color: white;
}

button {
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    display: block;
    width: 200px;
    margin: 4px auto;
    color: white;
    border: none;
    border-radius: 4px;

    &:hover {
        background-color: rgb(68, 64, 64);
        color: white;
        transition: all .3s ease-in-out;
    }

}
</style>