<template>
  
<div class="data">
    <p>NO HAY DATOS</p>
</div>

</template>

<script>
export default {
setup () {
    return {
    }
}
}
</script>

<style lang="scss" scoped>

.data {
    display: flex;
    justify-content: center;
    align-content: center;
    color: white;
    height: 300px;
    border-radius: 4px;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.data p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 25px;
}

</style>