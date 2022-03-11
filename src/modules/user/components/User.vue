<template>
  <div class="mx-1 user-container pointer p-2"
  @click="$router.push({ name: 'user-view', params: { id: user.uid }})">
    <div class="user-title d-flex justify-content-between">
        <span>{{user.name}} </span>
        <!-- <span><b>{{user.mail}}</b></span> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const userProps = ref([])
        // userProps.value = props.user.name

        return {
            userProps
        }
    }

}
</script>

<style lang="scss" scoped>
.user-container {
  background-color: white;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  border: 0.01rem solid rgb(255, 255, 255);
  transition: 0.2s all ease-in;

  &:hover {
    font-size: 18px;
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}

@media screen and (max-width: 768px) {
  .user-container {
    font-size: 1.2rem;
    &:hover {
      font-size: 1.4rem;
    }
  }
}
</style>