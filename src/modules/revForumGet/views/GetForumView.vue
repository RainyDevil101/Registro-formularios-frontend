<template>
  <div v-if="showAn === true">
    <div>
      <img-an :userAn="userAn" @on:close="onShowAn" />
    </div>
  </div>

  <div v-if="showRe === true">
    <div>
      <img-re :userRe="userRe" @on:closeRe="onShowRe"  />
    </div>
  </div>

  <div v-if="onLoad === true">
    <loader />
  </div>
  <div v-else>
    <div class="full-forum">
      <div class="header-forum">
        <h4>
          SUPERVISOR:
          <b>{{ forum.name }}</b>
        </h4>
        <h4>
          N° DE FOLIO:
          <b>{{ forum.code }}</b>
        </h4>

        <div class="img-forum">
          <h4 @click="onShowAn" class="img-hov pointer">Fotografía anverso de ART</h4>
        </div>
        <div class="img-forum">
          <h4 @click="onShowRe" class="img-hov pointer">Fotografía reverso de ART</h4>
        </div>
      </div>
      <div class="forum-container">
        <div class="questions">
          <div class="in-forum">
            <p class="hdr">DATOS SUPERVISOR</p>
            <div class="lines"></div>
            <p>Usuario:</p>
            <p>Fecha en sistema:</p>
            <p>Fecha ingresada:</p>
            <p>Rut:</p>
            <p>Cargo:</p>
            <p class="activity">Actividad:</p>
            <p>Faena:</p>
            <div class="lines"></div>
            <p>ALTERNATIVAS</p>
            <p>Alternativa 1:</p>
            <p>Alternativa 2:</p>
            <p>Alternativa 3:</p>
            <p>Alternativa 4:</p>
            <p>Alternativa 5:</p>
            <div class="lines"></div>
            <p class="controls">¿En los controles existen "NO" como respuestas?:</p>
            <div class="lines"></div>
            <p
              v-if="userControl === 'Si'"
            >SEÑALE LAS MEDIDAS DE CONTROL IMPLEMENTADAS ANTES DE COMENZAR LA TAREA</p>
            <div v-if="userControl === 'Si'" class="lines"></div>
            <p>
              ESTADO DEL FORMULARIO:
              <b>{{ forum.statusForum }}</b>
            </p>
          </div>
        </div>
        <div class="answers">
          <div class="in-forum">
            <p class="hdr">RESPUESTAS</p>
            <div class="lines"></div>
            <p>{{ userName }}</p>
            <p>{{ manDay }} {{ manMonth }} {{ manYearDay }}</p>
            <p>{{ acDay }} {{ acMonth }} {{ acYearDay }}</p>
            <p>{{ forum.run }}</p>
            <p>{{ userPosition }}</p>
            <p class="activity">{{ userObligation }}</p>
            <p>{{ userTask }}</p>
            <div class="lines"></div>
            <p>ALTERNATIVAS SELECCIONADAS</p>
            <p>Opción {{ forum.question1 }}</p>
            <p>Opción {{ forum.question2 }}</p>
            <p>Opción {{ forum.question3 }}</p>
            <p>Opción {{ forum.question4 }}</p>
            <p>Opción {{ forum.question5 }}</p>
            <div class="lines"></div>
            <p class="controls">{{ userControl }}</p>
            <div class="lines"></div>
            <p v-if="userControl === 'Si'">{{ forum.postControl }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import useIdForum from '../composables/forumId';
import saveForum from '../composables/saveForum';
import Loader from '../../../components/Loader.vue';
import ImgAn from "../components/imgAn.vue";
import ImgRe from "../components/imgRe.vue";

export default {
  components: { Loader, ImgAn, ImgRe },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const showAn = ref(false);
    const showRe = ref(false);

    const { forum, userName, userPosition, userTask, userControl, userControlRe, userAn, userRe, onLoad, userObligation, manDay, manMonth, manYearDay, acDay, acMonth, acYearDay, acMin, acHour, errorMessage, searchForum, isLoading } = useIdForum(route.params.id);

    const userForm = ref({
      name: false,
      revDate: false,
      revRun: false,
      revPosition: false,
      revTask: false,
      revObligation: false,
      revQuestion1: false,
      revQuestion2: false,
      revQuestion3: false,
      revQuestion4: false,
      revQuestion5: false,
      revControls: false,
      revPostControl: false,
      revStatusForum: "REVISADO",
      revImgAn: false,
      revImgRe: false,
    });

    

    const { saveForumDb, errorsFor } = saveForum();

    //         setTimeout(function() {
    //     console.log(day);
    // }, 3000);

    return {
      userForm,
      forum,
      errorMessage,
      searchForum,
      isLoading,
      saveForumDb,
      errorsFor,
      userName,
      userPosition,
      userTask,
      userControl,
      userControlRe,
      userAn,
      userRe,
      showAn,
      showRe,
      onLoad,
      manDay,
      manMonth,
      manYearDay,
      acDay,
      acMonth,
      acYearDay,
      acMin,
      acHour,
      userObligation,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const check = userForm.value

        if (
          check.name === '' ||
          check.dateAc === '' ||
          check.run === '' ||
          check.revPosition === '' ||
          check.revTask === '' ||
          check.revObligation === '' ||
          check.revQuestion1 === '' ||
          check.revQuestion2 === '' ||
          check.revQuestion3 === '' ||
          check.revQuestion4 === '' ||
          check.revQuestion5 === '') {

          return Swal.fire({
            title: "Error",
            text: `Debe completar los campos`,
            icon: "error",
          });

        }

        const { ok, errors } = await createForum(
          userForm.value
        );
        if (ok === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          });
        } else {
          Swal.fire("Guardado", "Formulario registrado con éxito", "success").then(
            function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error, intente nuevamente")
              }
            }
          )
        }
      },
      onShowAn: async () => {

        if (showAn.value === false) {
          showAn.value = true
          return
        }

        if (showAn.value === true) {
          showAn.value = false
          return
        }

      },
      onShowRe: async () => {

        if (showRe.value === false) {
          showRe.value = true
          return
        }

        if (showRe.value === true) {
          showRe.value = false
          return
        }

      },
      // controlY: () => onShow.value = true,
      // controlN: () => onShow.value = false,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
}

p {
  margin: 0;
}

.activity {

  // background-color: blue;
  height: 21px;
  // overflow: hidden;
}
.img-icon {
  position: fixed;
  width: 100px;
  height: 100px;
}

.lines {
  background-color: rgba($color: #ce9346, $alpha: 1);
  height: 6px;
  margin: 13px 0px 13px 0px;
}

.controls {
  height: 21px;
}

.full-forum {
  min-width: 693px;
  background-color: white;
  height: calc(100vh - 135px);
  width: 90%;
  margin-left: 5%;
  overflow: scroll;
  overflow-x: hidden;
  // overflow-y: hidden;
}

.header-forum {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 4px 0px 4px;
  text-align: center;
}

.hdr {
  text-align: center;
}

.forum-container {
  margin: 0px 5px 0px 10px;
  widows: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1, auto);
  grid-template-areas: "questions answers";
}

.forum-container .questions {
  border: 1px solid black;
  background-color: white;
  grid-area: questions;
}

.in-forum {
  margin: 8px;
}

.forum-container .answers {
  border: 1px solid black;
  background-color: white;
  grid-area: answers;
}

.forum-container .checkbox {
  border: 1px solid black;
  background-color: white;
  grid-area: checkbox;
}


.options {
  height: 21px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.header-forum h4 {
  border: 1px solid black;
  padding: 2px 4px 2px 4px;
}

.img-hov:hover {
  background-color: rgba($color: black, $alpha: 1);
  color: white;
  transition: 0.2s all ease-in;
}

img {
  margin: auto;
  display: block;
  height: 350px;
  width: 200px;
  border: 3px solid black;
}
// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (max-width: 774px) {
  .full-forum {
    width: 100%;
    margin-left: 0%;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .full-forum {
    margin-left: 5%;
    width: 90%;
  }

  .imgs-forum {
    display: flex;
    text-align: center;
  }
  .imgs-forum div {
    width: 50%;
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>