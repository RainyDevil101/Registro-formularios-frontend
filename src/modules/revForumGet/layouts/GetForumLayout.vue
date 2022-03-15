<template>
  <user-navbar />
  <div class="forum-view">
    <router-view />
  </div>
</template>

<script>
import UserNavbar from '../../../components/UserNavbar.vue';

export default {
  components: {UserNavbar  },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

.forum-view {
  width: 90%;
  margin-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
}

@media (max-width: 774px) {

  .forum-view {
    overflow: scroll;
    overflow-y: hidden;
  }

}


</style>