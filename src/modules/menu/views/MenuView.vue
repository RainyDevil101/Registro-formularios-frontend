<template>
  <div class="front-page">

    <img src="../../../assets/background-menu.jpg" alt="No disponible">
     
     <div class="manual">
       <a download="Manual de uso" href=""></a>
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

img {
  width: 300px;
  display: block;
  margin: auto;
  border: 1px solid white;
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
  width: 700px;
}

}
</style>