<template>

    <div class="load">
        <router-view />
    </div>

</template>

<script>

export default {

    setup() {


        return {

        }
    }

}
</script>

<style lang="scss" scoped>

.load {
    position: absolute;
    height: 100%;
    width: 50%;
    left: 25%;
    top: 40%;
}

</style>