<template>
  <div class="front-page">

   <div class="bltn">
      <router-link :to="{ name: 'front-forum' }" active-link='active' style="text-decoration: none; color: inherit;"
    ><p>Responder formulario</p></router-link>
   </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {

  setup() {

    const router = useRouter();

    return {

    }

  }

};
</script>

<style lang="scss" scoped>
.front-page {
  text-align: justify;
  min-height: calc(100vh - 160px);
  height: 100%;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  margin-top: 3rem;
}

.bltn {
  margin-top: 17.5rem;
  margin-left: 10%;
  text-align: center;
  color: white;
  border-radius: 4px;
  width: 80%;
  background-color: rgba($color: black, $alpha: 1.0);
}

.front-page p {
  padding: 10px;
}
</style>