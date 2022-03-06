<template>
  <div class="in-span">
    <span>Iniciar sesión</span>
  </div>
  <form class="login-forum" @submit.prevent="onSubmit">
    <div class="forum-mail" data-validate="Enter username">
      <input v-model="userForm.mail" type="text" class="input-forum" placeholder="Correo" required />
    </div>

    <div class="forum-password" data-validate="Enter password">
      <input
        v-model="userForm.password"
        type="password"
        class="input-forum"
        placeholder="Contraseña"
        required
      />
    </div>

    <div class="in-forum">
      <button class="login-boton">Ingresar</button>
    </div>

    <div class="change-forum mt-5">
      <p>Si no tienes cuenta, ponte en contacto con el administrador.</p>
    </div>
  </form>
  <div>
    <button @click="onBack" class="btn btn-danger">Volver</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth';
import Swal from 'sweetalert2';

export default {

  setup() {

    const router = useRouter();
    const { loginUser } = useAuth();

    const userForm = ref({
      mail: "testotwo@gmail.com",
      password: "test123",
    });

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value);

        if (!ok) Swal.fire("Error", "Usuario no existe", "error");
        else router.push({ name: "loading" });
      },
      onBack: async () => {
        router.push({ name: 'select-login' })
      },

    };
  },
};
</script>

<style lang="scss" scoped>
body {
  font-size: 16px;
}

.in-span {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.forum-mail {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.forum-password {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}

.input-forum {
  text-align: center;
  width: 60%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid 2px rgb(255, 255, 255);
  transition: 0.5s;

  &:hover {
    border-bottom: solid 2px rgb(172, 172, 172);
  }
  &:focus {
    border-bottom: solid 2px rgb(0, 0, 0);
  }
}

.login-forum {
  margin-top: 3rem;
}

.in-forum {
  margin-top: 5rem;
  margin-bottom: 1rem;
}

.login-boton {
  font-size: 1.5rem;
  color: white;
  background-color: rgba($color: red, $alpha: 0.7);
  border: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 0.5s;
  border-radius: 0.3rem;

  &:hover {
    background-color: rgba($color: black, $alpha: 0.7);
  }
}

.change-forum {
  color: rgba($color: #3b3b3b, $alpha: 1);
  font-size: 0.7rem;
  text-decoration: none;
}

// x-Small devices (landscape phones, 375px and up)

@media (min-width: 375px) {
  .in-span {
    font-size: 1.7rem;
  }

  .forum-mail {
    font-size: 1.3rem;
  }
  .forum-password {
    font-size: 1.3rem;
  }
  .login-boton {
    font-size: 1.3rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .in-span {
    font-size: 1.8rem;
  }

  .forum-mail {
    font-size: 1.5rem;
  }
  .forum-password {
    font-size: 1.5rem;
  }
  .login-boton {
    font-size: 1.4rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .in-span {
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .forum-mail {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 5rem;
  }
  .forum-password {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .login-boton {
    font-size: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>