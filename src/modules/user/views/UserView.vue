<template>
  <div class="row justify-content-md-center" v-if="!user && !errorMessage">
    <div class="col-3 alert-info text-center mt-5 loading">
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
        <h4>
          <b>USUARIO</b>
        </h4>
      </div>
      <hr />
      <div class="body">
        <div class="pairs">
          <div class="title">
            <p>Nombre de usuario</p>
            <input v-model="user.name" type="text" maxlength="30" />
          </div>
          <div class="title">
            <p>E-mail</p>
            <input v-model="user.mail" type="text" maxlength="20" />
          </div>
        </div>
        <div class="pairs">
          <div class="title">
            <p>Rut</p>
            <input v-model="user.rut" type="text" maxlength="9" />
          </div>
          <div class="title">
            <p>Cargo</p>
            <input v-model="user.position" type="text" maxlength="40" />
          </div>
        </div>
        <div class="pairs">
          <div class="title">
            <p>Contraseña</p>
            <input v-model="user.password" type="password" maxlength="40" />
          </div>
          <div class="title">
            <p>Repetir contraseña</p>
            <input v-model="user.vaPassword" type="password" maxlength="40" />
          </div>
        </div>
        <div class="select">
          <div class="select-update">
            <p>Cambiar rol de usuario</p>
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
          <div class="select-update">
            <p>Cambiar faena</p>
            <select
              v-model="taskU"
              class="form-select"
              aria-label="multiple select example"
            >
              <option v-for="task of tasks" :key="task._id" :value="task.name">
                {{ task.name }}
              </option>
            </select>
          </div>
        </div>
        <p class="text">
          Fecha de creación:
          <b>{{ user.createdAt }}</b>
        </p>
        <hr />
      </div>
      <div class="act">
        <button type="submit" class="btn o-b btn-warning">Actualizar</button>
      </div>
    </form>
    <div class="other-buttons">
      <router-link
        :to="{ name: 'user-view-create' }"
        class="btn o-b btn-primary"
        >Crear nuevo usuario</router-link
      >
      <div class="delete">
        <button class="btn o-b btn-danger" @click="onDelete">Eliminar</button>
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
import getTasks from "../../gets/getTask";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const idPT = ref(route.params.id);
    const selected = ref();
    const taskU = ref();
    const selectRole = ref(false);

    const { user, errorMessage, searchUser, isLoading, userRole, userTask } =
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
      () => userTask.value,
      () => (taskU.value = userTask.value)
    );
    idPT.value = route.params.id;

    const { saveUserDb } = saveUser();
    const { deleteUserDb } = deleteUser();
    const { searchRoles, roles } = getRoles();
    const { searchTask, getTaskId, tasks } = getTasks();

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
        const { ok } = await deleteUserDb(idPT.value);

        if (ok === true) {
          const resp = await store.dispatch("users/deleteUser", idPT.value);

          Swal.fire("Eliminado", "", "success").then(function (result) {
            if (true) {
              router.push({ name: "user-view-create" });
            } else {
              window.alert("Error", "intente nuevamente");
            }
          });
        } else {
          window.alert("Error", "intente nuevamente");
        }
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
      taskU,
      searchTask,
      tasks,
      getTaskId,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const tasksFor = tasks.value;
        const taskUName = taskU.value;
        const taskUId = [];

        for (const t of tasksFor) {
          if (t.name == taskUName) {
            taskUId.push(t._id);
          }
        }

        const { ok, errorsUS } = await saveUserDb(
          user.value,
          selected.value,
          taskUId,
          idPT.value
        );

        if (ok.value === false) {
          Swal.fire("Error", `${errorsUS.value}.`, "error");
          return;
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

.loading {
  width: 9rem;
  margin: auto;
}

.select {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header {
  text-align: center;
}

.body {
  overflow: auto;
  overflow-x: hidden;
}

.o-b {
  margin: 4px;
}

.pairs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.other-buttons {
  display: flex;
}

@media screen and (max-width: 768px) {
  .header {
    text-align: center;
  }

  .select {
    text-align: center;
    display: block;
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