<template>
<rev-navbar />

  <div v-if="statusState === 'CARGANDO' ">
    <loader />
  </div>

  <div v-else
  class="contain">
    <div class="list">
      <user-list/>
    </div>
    <div class="otherView">
      <router-view />
    </div>
  </div>

</template>

<script>

import RevNavbar from '../../../components/RevNavbar.vue';
import UserList from '../components/UserList.vue';
import useAuth from '../../auth/composables/useAuth';
import getTerm from '../composables/userTerm';
import Loader from '../../../components/Loader.vue';

export default {
  components: { UserList, RevNavbar, Loader },

    setup() {


        const { getUsers } = useAuth();
        const { statusState } = getTerm();

        getUsers();


        return {
          statusState,
        }

    }

}
</script>

<style lang="scss" scoped>

.contain {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas: "array view"
                        "array view";
}

.contain .list,
.contain .otherView {
  background-color: rgba($color: #ffffff, $alpha: 1.0);
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 4px;
}

.contain .list {
  background-color: hsl(221, 55%, 16%);
  grid-area: array;


}

.contain .otherView {
  background-color: #e9e9e9;
  grid-area: view;

}

@media screen and (max-width: 768px) {

.contain {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-template-areas: "view"
                        "array";
}
  
}

</style>