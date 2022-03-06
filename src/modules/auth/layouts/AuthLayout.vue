<template>
    <div class="intro-box text-center">
      <router-view />
    </div>
</template>

<script>
export default {
    setup() {
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
  background-color: rgba($color: white, $alpha: 1);
  height: 35rem;
  left: 50%;
  position: absolute;
  top: 43%;
  transform: translate(-50%, -50%);
  width: 30%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

// Extra small devices (portrait phones, less than 576px)
// x-Small devices (landscape phones, 375px and up)

@media (min-width: 375px) { 

  body {
    font-size: 6px;
  }

  .intro-box {
  width: 80%;
}
 }

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { 

  .intro-box {
  width: 60%;
}
 }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { 

  .intro-box {
    font-size: 1rem;
  width: 50%;
}
 }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { 

  .intro-box {
  width: 30%;
}

 }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {  }

</style>