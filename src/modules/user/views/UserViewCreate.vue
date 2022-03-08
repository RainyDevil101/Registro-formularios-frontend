<template>
  <form @submit.prevent="onSubmit">
    <div class="header">
      <h3>Registrar usuario</h3>
    </div>
    <hr />
    <div class="body">
      <div class="pairs">
        <div class="title">
          <p class="text">Nombre de usuario</p>
          <input v-model="userForm.name" type="text" />
        </div>
        <div class="title">
          <p class="card-text">Email</p>
          <input v-model="userForm.mail" type="text" />
        </div>
      </div>
      <div class="pairs">
        <div class="title">
          <p class="text">RUT:</p>
          <input v-model="userForm.rut" type="password" />
        </div>
      </div>
      <div class="pairs">
        <div class="title">
          <p class="text">Contraseña</p>
          <input v-model="userForm.password" type="password" />
        </div>
        <div class="title">
          <p class="text">Repetir contraseña</p>
          <input v-model="userForm.vaPassword" type="password" />
        </div>
      </div>
      <div class="select">
        <div class="card-title change-role">Rol de usuario</div>
        <select
          v-model="userForm.role"
          class="form-select"
          aria-label="Default select example"
        >
          <option v-for="role of roles" :key="role._id" :value="role.role">
            {{ role.role }}
          </option>
        </select>
      </div>
      <div class="select">
        <div class="card-title change-storage">
          <p v-on:click="creStorage" class="text-storage pointer">
            División asignada
          </p>
        </div>
        <select
          v-on:click="onRecharge"
          v-model="userForm.storage"
          class="form-select"
          aria-label="Default select example"
        >
          <option
            v-for="storage of storages"
            :key="storage._id"
            :value="storage._id"
          >
            {{ storage.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="register">
      <button type="submit" class="btn btn-primary">Registrar</button>
    </div>
  </form>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";

import createUser from "../composables/createUser";
import getRoles from "../../gets/getRoles";
import getStorages from "../../gets/getStorage";

import Swal from "sweetalert2";

export default {
  setup() {
    const router = useRouter();

    const userForm = ref({
      name: "",
      mail: "",
      password: "",
      vaPassword: "",
      role: "",
      rut: "",
      storage: "",
    });

    const { createUserDb } = createUser(userForm.value);
    const { searchRoles, roles } = getRoles();
    const { searchStorages, storages } = getStorages();

    return {
      userForm,
      searchRoles,
      roles,
      searchStorages,
      storages,

      onRecharge: () => {
        searchStorages();
      },

      creStorage: async () => {
        window.open("#/storage", "_blank");
      },

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { ok, message, errorsUS } = await createUserDb(userForm.value);
        if (ok === false) {
          Swal.fire({
            title: "Error",
            text: `${errorsUS.value}.`,
            icon: "error",
          });
        } else {
          Swal.fire("Guardado", "Usuario creado con éxito", "success").then(
            function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error, intente nuevamente");
              }
            }
          );
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pairs {
  display: flex;
  justify-content: space-between;
}

.title {
  margin-top: 0.5rem;
}

.header {
  text-align: center;
}

.register {
  justify-content: center;
  text-align: center;
  display: flex;
  width: 100%;
  margin-top: 1rem;
}

.register .btn {
  width: 50%;
}

.select {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 768px) {
  .title {
    text-align: center;
    margin-left: 0rem;
  }

  .pairs {
    display: block;
  }

  .body {
    display: block;
    text-align: center;
  }

  .register {
    margin-top: 9rem;
  }
}

@media screen and (max-width: 1200px) {
  .title {
    text-align: center;
    margin-left: 0rem;
  }

  .register {
    margin-top: 6rem;
  }

  .header {
    text-align: center;
  }
}
</style>