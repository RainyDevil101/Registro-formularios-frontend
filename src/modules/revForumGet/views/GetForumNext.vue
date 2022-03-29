<template>
  <div v-if="onLoad === true">
    <loader />
  </div>

  <div v-else>
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
                    <input
                      type="radio"
                      v-model="userForm.questionOne"
                      name="question1"
                      value="si"
                    />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input
                      type="radio"
                      v-model="userForm.questionOne"
                      name="question1"
                      value="name"
                    />
                  </div>
                </div>
            </div>
            
              <div class="question">
                <h3>
                  <b>¿LOS CONTROLES CRÍTICOS CORRESPONDEN A LOS RC IDENTIFICADOS DE LIBRETA DE PREGUNTAS?</b>
                </h3>
                <div class="controls">
                  <div class="control">
                    <p>Si</p>
                    <input
                      type="radio"
                      v-model="userForm.questionTwo"
                      name="question2"
                      value="si"
                    />
                  </div>
                  <div class="control">
                    <p>No</p>
                    <input
                      type="radio"
                      v-model="userForm.questionTwo"
                      name="question2"
                      value="name"
                    />
                  </div>
                </div>
            </div>

            <button type="submit" class="btn btn-warning my-2">ENVIAR</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from "vue";
import Loader from '../../../components/Loader.vue';
import ImgAn from "../components/imgAn.vue";
import ImgRe from "../components/imgRe.vue";
import questions from '../composables/questions';
import { useStore } from 'vuex';
import useFormStore from "../composables/getForum";
import Swal from 'sweetalert2';

export default {
  components: { Loader, ImgAn, ImgRe },
  setup() {

    const store = useStore();
    const onLoad = ref(false);

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

      revStatusForum: "REVISADO",

    });

    const { userNeeded, localStorageForum } = useFormStore();

    const { answers, answersText } = questions();

    watch(
      () => userNeeded.value,
      () => onLoading()
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

      onSubmit: async () => {
        console.log(answers.answer);
      },

      // onSubmit: async () => {

      //   new Swal({
      //     title: 'Espere por favor',
      //     allowOutsideClick: false,
      //   });
      //   Swal.showLoading();

      //   const check = userForm.value

      //   if ()

      // },

      user: computed(() => store.getters['auth/getUser']),
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

.controls {
  display: flex;
  align-items: center;
  justify-content: center ;
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
  width: 400px;
  background-color: white;
  text-align: center;
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
    .question {
        width: 400px;
    }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
    .question {
        width: 600px;
    }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    .question {
        width: 800px;
    }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>