<template>
  <div class="front-page">
    <img src="../../../assets/gt1.jpg" alt="loading xD">
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
  width:  100%;
}
img {
  border: 1px solid white;
  width: 67%;
  margin: auto;
}

.bltn {
  text-align: center;
  margin-top: 17.5rem;
}

.front-page p {
  padding: 10px;
}
</style>