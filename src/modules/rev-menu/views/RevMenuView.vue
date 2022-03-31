<template>
  <div class="up">
    <div class="front-page">
    <img src="../../../assets/gt1.jpg" alt="No disponible">
  </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {

  setup() {

    const router = useRouter();

    return {
      onForm: () => {
        router.push({ name: 'rev-list-forum' })
      }
    }

  }

};
</script>

<style lang="scss" scoped>
.front-page {
  display: flex;
  margin: auto;
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

.up {
  margin-top: 3rem;
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