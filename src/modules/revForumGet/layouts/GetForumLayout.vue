<template>
  <user-navbar class="navbar-fixed" />
  <div class="forum-view">
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount, watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useIdForum from '../composables/forumId';
// import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onRenderTracked, onRenderTriggered, onUnmounted, onUpdated } from 'vue';
import UserNavbar from '../../../components/UserNavbar.vue';

export default {
  components: { UserNavbar },

  setup() {

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const { errorMessage } = useIdForum();

    const getForumId = async () => {

      if (!route.params.id) {
        return
      }
      const forumNeeded = await store.dispatch('forums/getForum', route.params.id)
      return forumNeeded
    }

    watch(
      () => route.params.id,
      () => getForumId()
    )

    getForumId();
    

    onBeforeMount(() => {
      if(store.state.forums.error === true) {
        router.push({ 'name': 'no-forum' })
      }
    })
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

    return {
      getForumId,
      errorMessage,
    };
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

.navbar-fixed {
  position: absolute;
  width: 100%;
}

@media (max-width: 774px) {
  .forum-view {
    overflow: scroll;
    overflow-y: hidden;
  }
}
</style>