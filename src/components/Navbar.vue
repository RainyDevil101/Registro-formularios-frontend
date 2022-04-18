<template>

  <nav class="navbar navbar-expand-lg navbar-light bcc">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 txt-c">
                    <li class="nav-item box-a">
                        <a @click="menu" class="nav-link active pointer">
                            <b>Menu</b>
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
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  }

  .txt-c {
    text-align: center;
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

  @media (min-width: 991px) {
  .box-a {
    background-color: white;
    margin: 0px 4px 0px 4px;
    width: 150px;
    border-radius: 4px;

    &:hover {
      background-color: rgb(203, 203, 203);
    }
  }
}

</style>