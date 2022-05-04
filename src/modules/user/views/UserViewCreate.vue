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
          <p class="text">RUT</p>
          <input v-model="userForm.rut" type="text" />
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
        <div class="card-title change-role">Cargo</div>
        <select
          v-model="userForm.position"
          class="form-select"
          aria-label="Default select example"
        >
          <option v-for="position of positions" :key="position._id" :value="position._id">
            {{ position.name }}
          </option>
        </select>
      </div>
      <div class="select">
        <div class="card-title change-storage">
          <p class="text-storage pointer">
            División asignada
          </p>
        </div>
        <select
          v-on:click="onRecharge"
          v-model="userForm.task"
          class="form-select"
          aria-label="Default select example"
        >
          <option
            v-for="task of tasks"
            :key="task._id"
            :value="task._id"
          >
            {{ task.name }}
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
import { ref } from "@vue/reactivity";

import createUser from "../composables/createUser";
import getRoles from "../../gets/getRoles";
import getPositions from "../../gets/getPosition";

import Swal from "sweetalert2";
import getTask from "../../gets/getTask";

export default {
  setup() {

    const userForm = ref({
      name: "",
      mail: "",
      password: "",
      vaPassword: "",
      role: "",
      rut: "",
      task: "",
    });

    const { createUserDb } = createUser(userForm.value);
    const { searchRoles, roles } = getRoles();
    const { searchTask, tasks } = getTask();
    const { searchPosit, positions } = getPositions();

    return {
      userForm,
      searchRoles,
      roles,
      searchTask,
      tasks,
      searchPosit,
      positions,

      onRecharge: () => {
        searchTask();
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

.body {
  margin-top: 2rem;
  overflow: scroll;
  overflow-x: hidden;
  height: 26rem;
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

  // .register {
  //   margin-top: 9rem;
  // }
}

@media screen and (max-width: 1200px) {
  .title {
    text-align: center;
    margin-left: 0rem;
  }

  // .register {
  //   margin-top: 6rem;
  // }

  .header {
    text-align: center;
  }
}
</style>