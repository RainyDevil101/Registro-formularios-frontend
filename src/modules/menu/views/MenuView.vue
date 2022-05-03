<template>
  <div class="front-page">

    <img src="../../../assets/background-menu.jpg" alt="No disponible">
     
   
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
  text-align: center;
  min-height: calc(100vh - 140px);
  height: 100%;
  margin-top: 3rem;
}

img {
  width: 300px;
  display: block;
  border: 1px solid white;
  margin: auto;
}

.front-page p {
  padding: 10px;
}

@media (min-width: 768px) {

img {
  width: 550px;
}

}

@media (min-width: 992px) {

img {
  width: 850px;
}

}
</style>