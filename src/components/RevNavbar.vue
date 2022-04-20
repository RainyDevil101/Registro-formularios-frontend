<template>
  <nav class="navbar navbar-expand-lg navbar-light bcc">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 txt-c">
          <li class="nav-item box-a">
            <a @click="menu" class="nav-link active pointer">
              <b>Menu</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="dashboard" class="nav-link active pointer">
              <b>Dashboard</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="all" class="nav-link active pointer">
              <b>Todas</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="revisadas" class="nav-link active pointer">
              <b>Revisadas</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="lista" class="nav-link active pointer">
              <b>Pendientes</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="usuario" class="nav-link active pointer">
              <b>Usuarios</b>
            </a>
          </li>
        </ul>
        <button class="logout" @click="onLogOut">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
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
      dashboard: () => {
        router.push({ name: 'dashboard-view' })
      },
      all: () => {
        router.push({ name: 'all-forums' })
      },
      revisadas: () => {
        router.push({ name: 'rev-list-completed' })
      },
      lista: () => {
        router.push({ name: 'rev-list-forum' })
      },
      usuario: () => {
        router.push({ name: 'user-view-create' })
      },
    }

  }
}
</script>

<style lang="scss" scoped>
.bcc {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);

}



.txt-c {
  text-align: center;
}

  nav .navbar-nav li a{
  color: white !important;
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

@media (min-width: 991px) {

  nav .navbar-nav li a{
  color: black !important;
  }
  .box-a {
    background-color: white;
    margin: 0px 4px 0px 4px;
    width: 120px;
    border-radius: 4px;

    &:hover {
      background-color: rgb(203, 203, 203);
    }
  }
}
</style>