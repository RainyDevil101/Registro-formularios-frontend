<template>

  <div v-if="loaded === false" class="loader">
    <div></div>
  </div>

  <div v-else class="hgt">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <footer-t />
</template>

<script>
import { ref } from '@vue/reactivity';

import FooterT from './components/FooterT.vue';
import useAuth from './modules/auth/composables/useAuth';

export default {
  components: { FooterT },
  setup() {

    const { checkToken, reForms } = useAuth();

    const loaded = ref(false);

    checkToken();

    const lcForums = JSON.parse(localStorage.getItem('fP'))
    reForms(lcForums);
    

    window.onload = () => {

      loaded.value = true

    }

    return {
      checkToken,
      loaded,

    };
  },
};
</script>

<style>
#app {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: 100%;
  min-height: 100vh;
  background: url("./assets/backgroundft.png");
}

.hgt {
  min-height: calc(100vh - 55px);
}
.loader {
  min-height: calc(100vh - 55px);
}

.loader>div {
  height: 100px;
  width: 100px;
  border: 15px solid #45474b;
  border-top-color: yellow;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  animation: spin 1.5s infinite linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
