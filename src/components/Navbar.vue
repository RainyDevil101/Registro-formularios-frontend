<template>
<nav class="navbar navbar-dark bcc">
  <div class="container-fluid">
    <a @click="menu" class="navbar-brand">
      <b>Questionary</b>
    </a>
      <button class="logout" @click="onLogOut"><i class="fas fa-sign-out-alt"></i></button>
  </div>
</nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../modules/auth/composables/useAuth';
export default {
    setup() {

      const router = useRouter();
      const {logOut} = useAuth();

      return {
        onLogOut: () => {
          router.push({name: "select-login"});
          logOut();
        },
        menu: () => {
          router.push({ name: 'front-menu' })
        }
      }

    }
}
</script>

<style lang="scss" scoped>

  .bcc {
    background-color: rgba($color: red, $alpha: .3);
  }

  .logout {
    height: 40px;
    width: 40px;
    background-color: black;
    border: none;
    text-decoration: none;
    border-radius: 50%;
    font-size: 24px;
    color: white;
    transition: .3s;

    &:hover {
      background-color: white;
      color: black;
    }

  }

</style>