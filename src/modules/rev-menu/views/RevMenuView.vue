<template>
  <div class="front-page">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod eligendi adipisci quam vero tempore impedit tempora debitis suscipit assumenda velit blanditiis, alias corporis aliquam eaque. Pariatur asperiores magnam temporibus eos et. Incidunt praesentium totam tempore accusamus dolor, sapiente iste!</p>
    <div class="bltn">
      <p @click="onForm" class="btn btn-primary">Revisar formularios</p>
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
  text-align: justify;
  min-height: calc(100vh - 160px);
  height: 100%;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
}

.bltn {
  text-align: center;
  margin-top: 17.5rem;
}

.front-page p {
  padding: 10px;
}
</style>