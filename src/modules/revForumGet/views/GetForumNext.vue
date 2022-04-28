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
      <div class="forum-revisor">
        <div class="header">
          <h4>
            <b>REVISOR</b>
          </h4>
          <h1>
            NOMBRE:
            <b>{{ user.name }}</b>
          </h1>
          <h1>
            RUT:
            <b>{{ user.rut }}</b>
          </h1>
          <h1>
            REVISANDO FOLIO:
            <b>{{ userNeeded[0].code }}</b>
          </h1>
        </div>
        <div class="forum-container">
          <form @submit.prevent="onSubmit">
            <div class="text-q">
              <div class="question my-2">
                <h3>
                  <b>¿SE IDENTIFICAN LA TOTALIDAD DE LOS RIESGOS CRÍTICOS (RC) PRESENTES EN LA TAREA?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionOne" name="question1" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionOne" name="question1" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿LOS CONTROLES CRÍTICOS CORRESPONDEN A LOS RC IDENTIFICADOS DE LIBRETA DE PREGUNTAS?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionTwo" name="question2" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionTwo" name="question2" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL SUPERVISOR?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input
                      type="radio"
                      v-model="userForm.questionThree"
                      name="question3"
                      value="si"
                    />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input
                      type="radio"
                      v-model="userForm.questionThree"
                      name="question3"
                      value="no"
                    />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL TRABAJADOR?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionFour" name="question4" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionFour" name="question4" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿SE CONTESTARON TODAS LAS PREGUNTAS TRANSVERSALES (CUANDO APLICAN)?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionFive" name="question5" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionFive" name="question5" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿TODOS LOS TRABAJADORES FIRMARON LA TOMA DE CONOCIMIENTO DE LA ART?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionSix" name="question6" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionSix" name="question6" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿TODOS LOS INTEGRANTES DE LA TAREA CONOCEN EL CORRECTO USO DE LA ART?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input
                      type="radio"
                      v-model="userForm.questionSeven"
                      name="question7"
                      value="si"
                    />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input
                      type="radio"
                      v-model="userForm.questionSeven"
                      name="question7"
                      value="no"
                    />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿EL SUPERVISOR TITULAR O SUPERVISOR REEMPLAZANTE FIRMÓ EL ART?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input
                      type="radio"
                      v-model="userForm.questionEight"
                      name="question8"
                      value="si"
                    />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input
                      type="radio"
                      v-model="userForm.questionEight"
                      name="question8"
                      value="no"
                    />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>¿FUERON CORREGIDAS LAS DESVIACIONES?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input type="radio" v-model="userForm.questionNine" name="question9" value="si" />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input type="radio" v-model="userForm.questionNine" name="question9" value="no" />
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>OPORTUNIDADES ENCONTRADAS</b>
                </h3>
                <div class="controls">
                  <div class="control-text">
                    <textarea v-model="userForm.oportunidadesEncontradas" maxlength="300"></textarea>
                  </div>
                </div>
              </div>

              <div class="question my-2">
                <h3>
                  <b>FORTALEZA DE LA CDP</b>
                </h3>
                <div class="controls">
                  <div class="control-text">
                    <textarea v-model="userForm.fortalezaODP" maxlength="300"></textarea>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-warning my-2">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

import useIdForum from "../composables/forumId";
import saveForum from "../composables/saveForum";
import Loader from '../../../components/Loader.vue';
import ImgRe from "../components/imgRe.vue";
import questions from '../composables/questions';
import useFormStore from "../composables/getForum";
import counter from "../composables/counter";
import useAuth from "../../auth/composables/useAuth";
import ImgAn from "../components/imgAn.vue";

export default {
  components: { Loader, ImgRe, ImgAn },
  setup() {

    const router = useRouter();
    const store = useStore();
    const onLoad = ref(false);

    const { aCounter } = counter();
    const { errorsFor, saveForumDb } = saveForum();

    const userForm = ref({

      questionOne: '',
      questionTwo: '',
      questionThree: '',
      questionFour: '',
      questionFive: '',
      questionSix: '',
      questionSeven: '',
      questionEight: '',
      questionNine: '',
      oportunidadesEncontradas: '',
      fortalezaODP: '',

      statusForum: "REVISADO",

    });

    const showAn = ref(store.state.forums.ImgAn);
    watch(
      () => store.state.forums.imgAn,
      () => showAn.value = store.state.forums.imgAn
    );

    const showRe = ref(store.state.forums.ImgRe);
    watch(
      () => store.state.forums.imgRe,
      () => showRe.value = store.state.forums.imgRe
    );

    const { getForums } = useAuth();

    const { userNeeded, localStorageForum } = useFormStore();

    const { userAn, userRe } = useIdForum();

    const { answers, answersText } = questions();

    watch(
      () => userNeeded,
      () => onLoading()
    )
    watch(
      () => userNeeded,
      () => useIdForum()
    )

    const onLoading = () => {

      if (userNeeded.value === '') {
        return onLoad.value = true
      } else {
        return onLoad.value = false
      }
    }

    onBeforeMount(() => {
      localStorageForum()
    })

    onLoading();

    return {
      userForm,
      answers,
      answersText,
      userNeeded,
      localStorageForum,
      onLoad,
      onLoading,
      errorsFor,
      saveForumDb,
      aCounter,
      showAn,
      showRe,
      userAn,
      userRe,

      onSubmit: async () => {
      },

      onSubmit: async () => {

        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const check = userForm.value

        if (
          check.questionOne === '' ||
          check.questionTwo === '' ||
          check.questionThree === '' ||
          check.questionFour === '' ||
          check.questionFive === '' ||
          check.questionSix === '' ||
          check.questionSeven === '' ||
          check.questionEight === '' ||
          check.questionNine === '' ||
          check.oportunidadesEncontradas === '' ||
          check.fortalezaODP === ''
        ) {
          return Swal.fire({
            title: "Error",
            text: `Debe seleccionar los campos`,
            icon: "error",
          });
        }

        const { calidad, si } = aCounter(userForm.value);

        const forumNeeded = JSON.parse(localStorage.getItem('uN'))

        const { errorsFor, ok, code } = await saveForumDb(forumNeeded, userForm.value, calidad, si);

        if (ok === false) {
          Swal.fire({
            title: "Error",
            text: `${errorsFor.value}`,
            icon: 'error',
          });
        } else {
          Swal.fire('Guardado', `Formulario ${code.value} revisado con éxito`, 'success').then(function (result) {
            if (true) {
              getForums();
              router.push({ 'name': 'rev-list-forum' });
            } else {
              window.alert('Error, intente nuevamente');
            }
          })
        }

      },

      user: computed(() => store.getters['auth/getUser']),

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

textarea {
  border-radius: 4px;
  resize: none;
  width: 250px;
  background-color: rgba($color: #dbdbdb, $alpha: 1);
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.question {
  margin: auto;
  text-align: center;
  width: 300px;
  padding: 2px;
  border-radius: 4px;
  display: block;
  background-color: white;
}
.control {
  width: 40px;
}
.text-q {
  text-align: center;
  padding: 2px;
  border-radius: 4px;
  display: block;
  margin: auto;
}

.header {
  margin: auto;
  border-radius: 4px;
  display: block;
  width: 300px;
  background-color: white;
  text-align: center;
}

.up {
  margin-top: 3.5rem;
}
.forum-revisor {
  // min-width: 693px;
  height: calc(100vh - 135px);
  overflow: scroll;
  overflow-x: hidden;
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 600px) {
  .question,
  .header {
    width: 400px;
  }

  textarea {
    width: 350px;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .question,
  .header {
    width: 600px;
  }
  textarea {
    width: 550px;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .question,
  .header {
    width: 800px;
  }
  textarea {
    width: 750px;
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>