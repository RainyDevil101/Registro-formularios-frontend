<template>
  <div class="pd">
      <div class="intro-box">
    <router-view />
  </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onActivated, watch } from '@vue/runtime-core';
export default {
  setup() {

    const store = useStore();


    const reloadLogOut = () => {
      if (store.state.auth.keyRe === false) {
        console.log('aber');
      }

    }
      watch(
        () => store.state.auth.keyRe,
        () => reloadLogOut(),
      )

      onActivated(() => {
        reloadLogOut();
      })

    return {
      

    }
  }
}
</script>

<style lang="scss" scoped>
body {
  font-size: 16px;
}

.intro-box {
  margin-top: 2rem;
  padding: 4px;
  width: 400px;
  height: 600px;
  text-align: center;
  background-color: rgba($color: white, $alpha: 1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.pd {
  display: flex;
  // height: 100vh;
  justify-content: center;
  align-items: center;
}

// Extra small devices (portrait phones, less than 576px)
// x-Small devices (landscape phones, 375px and up)

@media (min-width: 375px) {
  body {
    font-size: 6px;
  }

  //   .intro-box {
  //   width: 80%;
  // }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  //   .intro-box {
  //   width: 60%;
  // }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  //   .intro-box {
  //     font-size: 1rem;
  //   width: 50%;
  // }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {

}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>