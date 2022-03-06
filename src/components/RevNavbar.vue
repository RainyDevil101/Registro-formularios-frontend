<template>
  <nav class="navbar navbar-dark bcc">
    <div class="container-fluid">
      <div class>
        <a @click="menu" class="pointer nav-btn navbar-brand">
          <b>Revisor</b>
        </a>
        <a @click="lista" class="pointer nav-btn navbar-brand">
          <b>Pendientes</b>
        </a>
        <a @click="lista" class="pointer nav-btn navbar-brand">
          <b>Usuarios</b>
        </a>
      </div>
      <!-- <a @click="lista" class="pointer navbar-brand">
        <b>Lista de pendientes</b>
      </a>-->
      <button class="logout" @click="onLogOut">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../modules/auth/composables/useAuth';
export default {
  setup() {

    const router = useRouter();
    const { logOut } = useAuth();

    return {
      onLogOut: () => {
        router.push({ name: "select-login" });
        logOut();
      },
      menu: () => {
        router.push({ name: 'rev-front-menu' })
      },
      lista: () => {
        router.push({ name: 'rev-list-forum' })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.bcc {
  background-color: rgba($color: red, $alpha: 0.3);
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
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
}

@media (max-width: 440px) {

  .nav-btn {
    font-size: 13px;
  }

}

</style>