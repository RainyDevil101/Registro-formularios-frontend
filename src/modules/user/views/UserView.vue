<template>
  <div class="row justify-content-md-center" v-if="!user && !errorMessage">
    <div class="col-3 alert-info text-center mt-5">
      Cargando...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>
  <h1 v-else-if="errorMessage">{{ errorMessage }}</h1>

  <template v-else>
    <form @submit.prevent="onSubmit">
      <div class="header">
        <h4><b>USUARIO</b></h4>
      </div>
      <hr />
      <div class="body">
        <div class="pairs">
          <div class="title">
            <p class="card-text">Nombre de usuario</p>
            <input v-model="user.name" type="text" />
          </div>
          <div class="title">
            <p class="card-text">E-mail</p>
            <input v-model="user.mail" type="text" />
          </div>
        </div>
        <div class="pairs">
          <div class="title">
            <p class="card-text">Rut</p>
            <input v-model="user.rut" type="text" />
          </div>
        </div>
        <div class="pairs">
          <div class="title">
            <p class="card-text">Contraseña</p>
            <input v-model="user.password" type="password" />
          </div>
          <div class="title">
            <p class="card-text">Repetir contraseña</p>
            <input v-model="user.vaPassword" type="password" />
          </div>
        </div>
        <div class="select">
          <div class="card-title change-role">Cambiar rol de usuario</div>
          <select
            v-model="selected"
            class="form-select"
            aria-label="multiple select example"
          >
            <option v-for="role of roles" :key="role._id" :value="role.role">
              {{ role.role }}
            </option>
          </select>
        </div>
        <div class="select">
          <div class="card-title change-storage">
            <p v-on:click="creStorage" class="pointer">
              Cambiar división de usuario
            </p>
          </div>
          <select
            v-on:click="onRecharge"
            v-model="stor"
            class="form-select"
            aria-label="multiple select example"
          >
            <option
              v-for="storage of storages"
              :key="storage._id"
              :value="storage.storage"
            >
              {{ storage.name }}
            </option>
          </select>
        </div>
        <p class="text">
          Fecha de creación: <b>{{ user.createdAt }}</b>
        </p>
        <hr />
      </div>
      <div class="act">
        <button type="submit" class="btn btn-warning">Actualizar</button>
      </div>
    </form>
    <div class="other-buttons">
      <router-link :to="{ name: 'user-view-create' }" class="btn btn-primary"
        >Crear nuevo usuario</router-link
      >
      <div class="delete">
        <button class="btn btn-danger" @click="onDelete">Eliminar</button>
      </div>
    </div>
  </template>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

import useIdUser from "../composables/userId";
import saveUser from "../composables/saveUser";
import deleteUser from "../composables/deleteUser";
import getRoles from "../../gets/getRoles";
import getStorages from "../../gets/getStorage";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const idPT = ref("");
    const selected = ref();
    const stor = ref([]);
    const selectRole = ref(false);

    const { user, errorMessage, searchUser, isLoading, userRole, userStorage } =
      useIdUser(route.params.id);

    watch(
      () => route.params.id,
      () => searchUser(route.params.id)
    );
    watch(
      () => route.params.id,
      () => (idPT.value = route.params.id)
    );
    watch(
      () => userRole.value,
      () => (selected.value = userRole.value)
    );
    watch(
      () => userStorage.value,
      () => (stor.value = userStorage.value)
    );

    const { saveUserDb, errorsUS } = saveUser();
    const { deleteUserDb } = deleteUser();
    const { searchRoles, roles } = getRoles();
    const { searchStorages, storages } = getStorages();

    const onDelete = async () => {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No se podrá recuperar una vez borrado",
        showDenyButton: true,
        confirmButtonText: "Estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { ok, message } = await deleteUserDb(route.params.id);

        Swal.fire("Eliminado", "", "success").then(function (result) {
          if (true) {
            router.push({ name: "user-view-create" });
          } else {
            window.alert("Error", "intente nuevamente");
          }
        });
      }
    };

    return {
      errorMessage,
      isLoading,
      onDelete,
      roles,
      saveUserDb,
      searchRoles,
      searchUser,
      selected,
      selectRole,
      user,
      searchStorages,
      storages,
      stor,

      onRecharge: () => {
        searchStorages()
      },

      creStorage: () => {
        window.open("#/storage", "_blank")
      },

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { ok, message, errorsUS } = await saveUserDb(
          user.value,
          selected.value,
          stor.value,
          route.params.id
        );

        if (ok === false) {
          Swal.fire("Error", `${errorsUS.value}.`, "error");
        } else {
          Swal.fire(
            "Guardado",
            "Usuario actualizado con éxito",
            "success"
          ).then(function (result) {
            if (true) {
              location.reload();
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
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

.body {
  margin-top: 2rem;
  overflow: scroll;
  overflow-x: hidden;
  height: 26rem;
}

.title {
  margin-top: 10px;
  margin-bottom: 10px;
}

.pairs {
  display: flex;
  justify-content: space-between;
}

.act {
  margin-top: 0.5rem;
  margin-bottom: 0.6rem;
}

.other-buttons {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .header {
    text-align: center;
  }

  .body {
    display: block;
  }

  .pairs {
    text-align: center;
    display: block;
  }

}
</style>