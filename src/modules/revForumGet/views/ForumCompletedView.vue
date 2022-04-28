<template>
  <div class="up">

    <div v-if="showAn === true">
      <div>
        <img-an :userAn="userAn" @on:close="onShowAn" />
      </div>
    </div>

    <div v-if="showRe === true">
      <div>
        <img-re :userRe="userRe" @on:closeRe="onShowRe" />
      </div>
    </div>

    <div>
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
          <div class="answers-two">
            <div class="in-forum-2">
              <p class="hdr">RESPUESTAS SEGUNDA PARTE</p>
              <div class="lines"></div>
              <p>¿SE IDENTIFICAN LA TOTALIDAD DE LOS RIESGOS CRÍTICOS (RC) PRESENTES EN LA TAREA?: <b>{{ forum.riesgosCriticos }}</b></p>
              <p>¿LOS CONTROLES CRÍTICOS CORRESPONDEN A LOS RC IDENTIFICADOS DE LIBRETA DE PREGUNTAS?: <b>{{ forum.controlesCriticos }}</b></p>
              <p>¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL SUPERVISOR?: <b>{{ forum.cumplenControles }}</b></p>
              <p>¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL TRABAJADOR?: <b>{{ forum.trabControles }}</b></p>
              <p>¿SE CONTESTARON TODAS LAS PREGUNTAS TRANSVERSALES (CUANDO APLICAN)?: <b>{{ forum.contestaronPreguntas }}</b></p>
              <p>¿TODOS LOS TRABAJADORES FIRMARON LA TOMA DE CONOCIMIENTO DE LA ART?: <b>{{ forum.todosTrabajadores }}</b></p>
              <p>¿TODOS LOS INTEGRANTES DE LA TAREA CONOCEN EL CORRECTO USO DE LA ART?: <b>{{ forum.todosIntegrantes }}</b></p>
              <p>¿EL SUPERVISOR TITULAR O SUPERVISOR REEMPLAZANTE FIRMÓ EL ART?: <b>{{ forum.supervisorTitular }}</b></p>
              <p>¿FUERON CORREGIDAS LAS DESVIACIONES?: <b>{{ forum.fueronCorregidas }}</b></p>
              <p>OPORTUNIDADES ENCONTRADAS: <b>{{ forum.oportunidadesEncontradas }}</b></p>
              <p>FORTALEZAS ODP: <b>{{ forum.fortalezaODP }}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { onBeforeUnmount, onUpdated, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import useIdForum from '../composables/forumId';
import useFormStore from "../composables/getForum";
import Loader from '../../../components/Loader.vue';
import ImgAn from "../components/imgAn.vue";
import ImgRe from "../components/imgRe.vue";
import { useStore } from 'vuex';

export default {
  components: { Loader, ImgAn, ImgRe },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const showAn = ref(store.state.forums.imgAn);
    watch(
      () => store.state.forums.imgAn,
      () => showAn.value = store.state.forums.imgAn
    );

    const showRe = ref(store.state.forums.imgRe);
    watch(
      () => store.state.forums.imgRe,
      () => showRe.value = store.state.forums.imgRe
    );

    const { getForm } = useFormStore();

    onUpdated(() => {
      getForm(route.params.id)
    })

    onBeforeUnmount(() => {
      getForm(null)
    })

    const { forum, userName, userPosition, userTask, userControl, userControlRe, userAn, userRe, onLoad, userObligation, manDay, manMonth, manYearDay, acDay, acMonth, acYearDay, acMin, acHour, errorMessage, searchForum } = useIdForum();

    return {
      forum,
      errorMessage,
      searchForum,
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
      getForm,

      onShowAn: () => {

        return store.dispatch('forums/changeImgAn', false)

      },
      onShowRe: () => {

        return store.dispatch('forums/changeImgRe', false)

      },
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

.next {
  margin-top: 50px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.next-btn {
  font-size: 12px;
  text-align: center;
  margin: auto;
}

.activity {
  height: 21px;
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
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1, auto);
  grid-template-areas: "questions answers"
                        "questionsTwo questionsTwo";
}

.forum-container .questions {
  background-color: white;
  grid-area: questions;
}

.forum-container .answers-two {
  background-color: white;
  grid-area: questionsTwo;
}

.up {
  margin-top: 3.5rem;
}

.in-forum {
  margin: 8px;
}

.forum-container .answers {
  background-color: white;
  grid-area: answers;
}

.header-forum h4 {
  border: 1px solid black;
  padding: 2px 4px 2px 4px;
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
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>