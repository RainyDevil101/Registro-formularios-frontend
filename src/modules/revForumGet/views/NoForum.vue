<template>
  
<div class="no-forum">
    <h1 class="align-self-center">NO EXISTE EL FORMULARIO</h1>
</div>

</template>

<script>
import { onDeactivated } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {

setup () {

    const store = useStore();

    const blockImgs = () => {
        store.commit('forums/blocImg')
    };

    blockImgs();

    onDeactivated(() => {
        store.commit('forums/notBlock')
    })

    return {
        blockImgs,
    }
}

}
</script>

<style lang="scss" scoped>

.no-forum {
    justify-content: center;
    margin: auto;
    display: flex;
    align-content: center;
    background-color: white;
    height: 100%;
    width: 80%;
    border-radius: 4px;
}

</style>