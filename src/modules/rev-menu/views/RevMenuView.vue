<template>
  <div class="front-page">
    <img src="../../../assets/gt1.jpg" alt="No disponible">
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
  max-width: 1200px;
  display: flex;
  margin: auto;
}

img {
  display: block;
  max-width: 1050px;
  border: 1px solid white;
  margin: auto;
}

.front-page p {
  padding: 10px;
}
</style>