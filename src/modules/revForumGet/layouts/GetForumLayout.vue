<template>
  <user-navbar />
  <div class="forum-view">
    <router-view />
  </div>
</template>

<script>
// import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onUnmounted, onUpdated } from '@vue/runtime-core';
import UserNavbar from '../../../components/UserNavbar.vue';

export default {
  components: { UserNavbar },

  setup() {

    // onBeforeMount(() => {
    //   console.log('onBeforeMount');
    // })
    // onMounted(() => {
    //   console.log('onMounted');
    // })
    // onBeforeUpdate(() => {
    //   console.log('onBeforeUpdate');
    // })
    // onUpdated(() => {
    //   console.log('onUpdated');
    // })
    // onBeforeUnmount(() => {
    //   console.log('onBeforeUnmount');
    // })
    // onUnmounted(() => {
    //   console.log('onUnmounted');
    // })
    // onErrorCaptured(() => {
    //   console.log('onErrorCaptured');
    // })
    // onRenderTracked(() => {
    //   console.log('onRenderTracked');
    // })
    // onRenderTriggered(() => {
    //   console.log('onRenderTriggered');
    // })
    // onActivated(() => {
      
    // })
    // onDeactivated(() => {
    //   console.log('onDeactivated');
    // })

    return {};
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
}

@media (max-width: 774px) {
  .forum-view {
    overflow: scroll;
    overflow-y: hidden;
  }
}
</style>