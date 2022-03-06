<template>
  <div class="loader-rev">
      <div></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.loader-rev>div {
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