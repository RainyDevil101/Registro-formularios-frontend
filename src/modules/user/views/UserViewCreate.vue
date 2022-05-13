<template>
  <form @submit.prevent="onSubmit">
    <div class="header">
      <h3>Registrar usuario</h3>
    </div>
    <hr />
    <div class="body">
      <div class="pairs">
        <div class="title">
          <p>Nombre de usuario</p>
          <input v-model="userForm.name" type="text" maxlength="30"/>
        </div>
        <div class="title">
          <p>Email</p>
          <input v-model="userForm.mail" type="text" maxlength="70"/>
        </div>
      </div>
      <div class="pairs">
        <div class="title">
          <p>RUT</p>
          <input v-model="userForm.rut" type="text" maxlength="9"/>
        </div>
        <div class="title">
          <p>Cargo</p>
        <input v-model="userForm.position" type="text" maxlength="40">
        </div>
      </div>
      <div class="pairs">
        <div class="title">
          <p>Contraseña</p>
          <input v-model="userForm.password" type="password" maxlength="40"/>
        </div>
        <div class="title">
          <p>Repetir contraseña</p>
          <input v-model="userForm.vaPassword" type="password" maxlength="40"/>
        </div>
      </div>
      <div class="select">
        <p>Rol de usuario</p>
        <select v-model="userForm.role" aria-label="Default select example">
          <option v-for="role of roles" :key="role._id" :value="role.role">
            {{ role.role }}
          </option>
        </select>
      </div>
      <div class="select">
        <p>
          División asignada
        </p>
        <select v-on:click="onRecharge" v-model="userForm.task" aria-label="Default select example">
          <option v-for="task of tasks" :key="task._id" :value="task._id">
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
      position:"",
    });

    const { createUserDb } = createUser(userForm.value);
    const { searchRoles, roles } = getRoles();
    const { searchTask, tasks } = getTask();

    return {
      userForm,
      searchRoles,
      roles,
      searchTask,
      tasks,

      // onRecharge: () => {
      //   searchTask();
      // },

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { ok, errorsUS } = await createUserDb(userForm.value);
        if (ok.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errorsUS.value}.`,
            icon: "error",
          });
          return
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
  overflow: auto;
  overflow-x: hidden;
}

.pairs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  text-align: center;
}

.register {
  justify-content: center;
  text-align: center;
  display: flex;
  width: 100%;
}

.register .btn {
  margin-top: 40px;
  width: 50%;
}

.select {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.select p {
  width: 200px;
}

.select select {
  width: 100px;
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

  .select p {
  width: 100%;
}

.select select {
  width: 75%;
}

.select {
  display: block;
}
}

@media screen and (max-width: 1200px) {
  .title {
    text-align: center;
    margin-left: 0rem;
  }
  .header {
    text-align: center;
  }
}
</style>