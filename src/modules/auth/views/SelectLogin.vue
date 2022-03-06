<template>
    <div class="selector">
        <h4>BIENVENIDO</h4>
    </div>

    <div class="choose">
        <button @click="onSupervisores" class="select btn btn-warning">INGRESAR</button>
    </div>
    <div class="change-forum mt-5">
        <p>Si no tienes cuenta, ponte en contacto con el administrador.</p>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {

    setup() {

        const router = useRouter();

        return {

            onSupervisores: () => {
                router.push({ name: 'login-supervisor' })
            },
        }
    }

}
</script>

<style lang="scss" scoped>
body {
    font-size: 16px;
}
.selector {
    text-align: center;
    color: #fff;
    background-color: black;
    border-radius: 4px;
    width: 80%;
    margin-left: 10%;
    margin-top: 2rem;
    padding: 2px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.select {
    text-align: center;
    width: 70%;
    padding: 10px;
    margin-top: 5rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.change-forum {
    text-align: center;
    color: rgba($color: #3b3b3b, $alpha: 1);
    font-size: 0.7rem;
    text-decoration: none;
    width: 80%;
    margin-left: 10%;
}
</style>