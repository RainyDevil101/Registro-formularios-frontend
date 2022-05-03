<template>
  <div>
    <div class="forum-one">
      <div class="header">
        <h3>
          <b>VERIFICACIÓN CALIDAD ART</b>
        </h3>
      </div>
      <div class="form-one">
        <form @submit.prevent="onSubmit">
          <div class="question">
            <h3>
              <b>FECHA</b>
            </h3>
            <input v-model="userForm.dateAc" type="datetime-local" />
          </div>

          <div class="question">
            <h3>
              <b>SUPERVISOR</b>
            </h3>
            <p>{{ user.name }}</p>
          </div>

          <div class="question">
            <h3>
              <b>RUT</b>
            </h3>
            <p>{{ user.rut }}</p>
          </div>

          <div class="question">
            <h3>
              <b>CARGO</b>
            </h3>
            <p>{{ position.name }}</p>
          </div>

          <div class="question">

            <h3>
              <b>SELECCIONE</b>
            </h3>

            <select v-model="taskSelect" class="form-select" aria-label="multiple select example">
              <option v-for="task of tasks" :key="task._id" :value="task.name">{{ task.name }}</option>
            </select>

          </div>

          <div class="question">
            <h3>
              <b>ACTIVIDAD</b>
            </h3>
            <input v-model="userForm.obligation" type="text" />
          </div>

          <div class="h3-header">
            <h3>
              <b>MARQUE LAS REGLAS QUE SALVAN LA VIDA QUE APLICAN</b>
            </h3>
            <div class="question-2">
              <div class="separator">
                <p class="option">RQSV</p>
                <div class="options">
                  <p>N°1</p>
                  <p>N°2</p>
                  <p>N°3</p>
                  <p>N°4</p>
                  <p>N°5</p>
                  <p>N°6</p>
                  <p>N°10</p>
                  <p>N°15</p>
                  <p>N°18</p>
                  <p>N°20</p>
                </div>
              </div>

              <div class="separator">
                <p class="option">Opción 1</p>
                <div class="options">
                  <input v-model="userForm.question1" v-for="option of options" :value="option" type="radio" name="1" />
                </div>
              </div>

              <div class="separator">
                <p class="option">Opción 2</p>
                <div class="options">
                  <input v-model="userForm.question2" v-for="option of options" :value="option" type="radio" name="2" />
                </div>
              </div>

              <div class="separator">
                <p class="option">Opción 3</p>
                <div class="options">
                  <input v-model="userForm.question3" v-for="option of options" :value="option" type="radio" name="3" />
                </div>
              </div>

              <div class="separator">
                <p class="option">Opción 4</p>
                <div class="options">
                  <input v-model="userForm.question4" v-for="option of options" :value="option" type="radio" name="4" />
                </div>
              </div>

              <div class="separator">
                <p class="option">Opción 5</p>
                <div class="options">
                  <input v-model="userForm.question5" v-for="option of options" :value="option" type="radio" name="5" />
                </div>
              </div>
            </div>
          </div>

          <div class="question">
            <h3>
              <b>¿ En los controles existen - NO - como respuestas?</b>
            </h3>
            <div class="controls">
              <div class="control">
                <p>Si</p>
                <input type="radio" @click="controlY" v-model="userForm.controls" name="control" value="true" />
              </div>
              <div class="control">
                <p>No</p>
                <input type="radio" @click="controlN" v-model="userForm.controls" name="control" value="false" />
              </div>
            </div>
          </div>

          <div v-if="onShow === true" class="question-if">
            <h3>
              <b>SEÑALE LAS MEDIDAS DE CONTROL IMPLEMENTADAS ANTES DE COMENZAR LA TAREA</b>
            </h3>
            <input v-model="userForm.postControl" type="text" />
          </div>

          <div class="question">
            <h3>
              <b>Fotografía anverso de ART</b>
            </h3>
            <input type="file" @change="onSelectedImage" id="fileAn" accept="image/png, image/jpg, image/ jpeg" />
            <label for="fileAn">Seleccione la imagen</label>

            <div v-if="localImageOne" class="confirmation">
              <p>{{ imgOneName }}</p>
            </div>
          </div>

          <div class="question">
            <h3>
              <b>Fotografía reverso de ART</b>
            </h3>
            <input type="file" @change="onSelectedImageT" id="fileRe" accept="image/png, image/jpg, image/ jpeg" />
            <label for="fileRe">Seleccione la imagen</label>

            <div v-if="localImageTwo" class="confirmation">
              <p>{{ imgTwoName }}</p>
            </div>
          </div>

          <button type="submit" class="diag">ENVIAR</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import getPosit from "../../gets/getPosition";
import getUbication from "../../gets/getUbication";
import getTask from "../../gets/getTask";
import getOptions from "../../gets/getOptions";
import newForum from "../composables/sendForum";
import uploadImageOne from "../helpers/uploadImage";
import uploadImageTwo from "../helpers/uploadImageT";
import getUser from "../composables/getUser";
import Loader from "../../../components/Loader.vue";
import saveUser from "../../user/composables/saveUser";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userForm = ref({
      dateAc: "",
      obligation: "",
      question1: "omitida",
      question2: "omitida",
      question3: "omitida",
      question4: "omitida",
      question5: "omitida",
      controls: false,
      postControl: "",
      statusForum: "PENDIENTE",
    });


    const localImageOne = ref();
    const localImageTwo = ref();
    const imgOneName = ref();
    const imgTwoName = ref();
    const imgAn = ref(null);
    const imgRe = ref(null);
    const onShow = ref(false);
    const taskSelect = ref();

    const { positions, searchPosit } = getPosit();
    const { ubications, searchUbi } = getUbication();
    const { tasks, searchTask } = getTask();
    const { options } = getOptions();
    const { errors, createForum } = newForum();
    const { uploadImageAn } = uploadImageOne();
    const { uploadImageRe } = uploadImageTwo();
    const { userIdState, position, task, taskName, user, userRole } = getUser();
    const { saveUserDb } = saveUser();

    taskSelect.value = taskName.value

    watch(() => localImageOne.value, () => imgAn.value = localImageOne.value);
    watch(() => localImageTwo.value, () => imgRe.value = localImageTwo.value);

    return {
      route,
      router,
      userForm,
      positions,
      searchPosit,
      searchUbi,
      ubications,
      tasks,
      searchTask,
      errors,
      createForum,
      onShow,
      localImageOne,
      localImageTwo,
      imgAn,
      imgRe,
      uploadImageAn,
      uploadImageRe,
      imgOneName,
      imgTwoName,
      options,
      userIdState,
      position,
      task,
      taskSelect,
      taskName,
      saveUserDb,
      user,
      userRole,

      onSubmit: async () => {

        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const check = userForm.value;
        if (check.dateAc === "" ||
          check.obligation === "") {
          return Swal.fire({
            title: "Error",
            text: `Debe completar los campos`,
            icon: "error",
          });
        }
        if (imgAn.value === null || imgRe.value === null) {
          return Swal.fire({
            title: "Error",
            text: `Debe seleccionar las imagenes`,
            icon: "error",
          });
        }

        const taskFor = tasks.value
        const taskUName = taskSelect.value
        const taskUId = []
        const idState = userIdState.value

        for (const t of taskFor) {

          if (t.name == taskUName) {
            taskUId.push(t._id)
          }

        }

        const { ok, message, errorsUs } = await saveUserDb(
          user.value,
          userRole.value,
          taskUId,
          idState,
        )

        if (ok === false) {
          return Swal.fire({
            title: "Error",
            text: `Error al cambiar faena`,
            icon: "error",
          });
        }

        const pictureOne = await uploadImageOne(imgAn.value);
        const pictureTwo = await uploadImageTwo(imgRe.value);
        const { nice, errors, forumCode } = await createForum(userForm.value, pictureOne, pictureTwo, user.value, position.value, task.value);
        if (nice === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          });
        }
        else {
          Swal.fire("Guardado", `Formulario ${forumCode.value} guardado con éxito`, "success").then(function (result) {
            if (true) {
              location.reload();
            }
            else {
              window.alert("Error, intente nuevamente");
            }
          });
        }
      },
      onSelectedImage: async (event) => {
        const file = event.target.files[0];
        if (!file) {
          localImageOne.value = null;
          imgOneName.value = null;
          return;
        }
        else {
          imgOneName.value = file.name;
          const fr = new FileReader();
          fr.onload = () => localImageOne.value = fr.result;
          fr.readAsDataURL(file);
        }
      },
      onSelectedImageT: async (event) => {
        const file = event.target.files[0];
        if (!file) {
          localImageTwo.value = null;
          imgTwoName.value = null;
          return;
        }
        else {
          imgTwoName.value = file.name;
          const fr = new FileReader();
          fr.onload = () => localImageTwo.value = fr.result;
          fr.readAsDataURL(file);
        }
      },
      controlY: () => onShow.value = true,
      controlN: () => onShow.value = false,
    };
  },
  components: { Loader }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.forum-one {
  margin-top: 3rem;
  height: calc(100vh - 135px);
  overflow: scroll;
  overflow-x: hidden;
}

.header {
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 4px;
  width: 60%;
  text-align: center;
  background-color: white;
}

.h3-header {
  text-align: center;
  border-radius: 4px;
  background-color: white;
}

.question {
  height: 170px;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 4px;
  background-color: white;
}

.question-2 {
  height: auto;
  height: 100%;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 4px;
  background-color: white;
  overflow-x: scroll;
  padding-bottom: 16px;
}

.question-if {
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 4px;
  background-color: white;
}

.form-one {
  padding: 10px;
  margin-left: 12.5%;
  margin-right: 12.5%;
  width: 75%;
}

.controls {
  justify-content: center;
  display: flex;
}

.control {
  text-align: center;
  align-items: center;
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
}

.control p {
  height: 50%;
  margin-top: 25%;
  margin-bottom: 25%;
  margin-left: 10px;
  margin-right: 10px;
}

input[type="date"] {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba($color: #000000, $alpha: 0.7);
  padding: 15px;
  color: white;
  border: none;
  outline: none;
  border-radius: 4px;
}

::-webkit-calendar-picker-indicator {
  background-color: white;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
}

input[type="text"] {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  border: 1px solid black;
  outline: none;
  border-radius: 4px;
}

input[type="file"] {
  display: none;
}

input[type="radio"] {
  margin: auto;
}

label {
  cursor: pointer;
  font-size: 12px;
  color: white;
  height: 60px;
  width: 80%;
  margin-left: 10%;
  background-color: rgba($color: #000000, $alpha: 1);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
}

select {
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  text-align: center;
  padding: 10px;
  color: black;
  border: 1px solid black;
  outline: none;
  border-radius: 4px;
}

.separator {
  width: 100%;
  min-width: 30rem;
  align-items: center;
  display: flex;
  text-align: center;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.option {
  width: 10%;
  font-size: 10px;
}

.options {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.options p {
  margin: auto;
  width: 24.012px;
  font-size: 10px;
}

h3 {
  font-size: 14px;
  padding-top: 18px;
  padding-bottom: 18px;
}

.diag {
  width: 100%;
  background-color: white;
  border-radius: 4px;

  &:hover {
    background-color: rgba($color: red, $alpha: 0.3);
    color: white;
    border-color: white;
  }
}

.confirmation {
  display: table;
  padding: 5px 8px 5px 8px;
  background-color: gray;
  color: white;
  width: 40%;
  min-width: 200px;
  max-width: 370px;
  margin: auto;
  margin-top: 8px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.confirmation p {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  overflow: hidden;
  max-width: 200px;
}

img {
  width: 200px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {}
</style>