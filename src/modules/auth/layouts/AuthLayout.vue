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
  padding: 4px;
  text-align: center;
  background-color: rgba($color: white, $alpha: 1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 90%;
  max-width: 400px;
  min-width: 360px;
}

.pd {
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: red;
}

// Extra small devices (portrait phones, less than 576px)
// x-Small devices (landscape phones, 375px and up)

@media (max-width: 375px) {
  .pd {
    background-color: red;
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
@media (max-width: 768px) {
  //    .intro-box {
  //      background-color: red($color: #000000);
  //  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {

}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>