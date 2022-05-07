<template>
    <div class="selector">
        <h4>BIENVENIDO</h4>
    </div>
    <div class="mt-5">
        <img src="../../../assets/logocacciuttolo.png" alt="Logo">
    </div>
    <div class="choose">
        <button @click="onSupervisores" class="select btng">INGRESAR</button>
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
    display: block;
    color: #fff;
      background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    border-radius: 4px;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.select {
    text-align: center;
    width: 70%;
    padding: 10px;
    margin-top: 5rem;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
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