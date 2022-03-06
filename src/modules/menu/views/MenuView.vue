<template>
  <div class="front-page">
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae esse
      eveniet ex earum, quasi tempora omnis ea numquam nulla doloremque quam?
      Voluptatibus eum fuga, natus inventore maxime nisi itaque doloremque?
    </p>
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
  background-color: rgb(255, 242, 204);
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