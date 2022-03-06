<template>
  <rev-navbar />
  <div class="forum-view">
    <rev-forum-list/>
  </div>
</template>

<script>
import RevNavbar from "../../../components/RevNavbar.vue";
import RevForumList from '../views/RevForumList.vue';
export default {
  components: { RevNavbar, RevForumList },

  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.forum-view {
  width: 90%;
  margin-left: 5%;
  padding-top: 20px;
  padding-bottom: 10px;
}


</style>