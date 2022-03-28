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
          <div class="text">
            <text-answer v-for="answer of answers" :key="answer.number" :answer="answer" />
            <answer-box
              v-for="answerText of answersText"
              :key="answerText.number"
              :answerText="answerText"
            />
            <button type="submit" class="btn btn-warning">ENVIAR</button>
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
import TextAnswer from '../components/TextAnswer.vue';
import questions from '../composables/questions';
import { useStore } from 'vuex';
import AnswerBox from "../components/answerBox.vue";
import useFormStore from "../composables/getForum";
import Swal from 'sweetalert2';

export default {
  components: { Loader, ImgAn, ImgRe, TextAnswer, AnswerBox },
  setup() {

    const store = useStore();
    const onLoad = ref(false);

    const userForm = ref({

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

    console.log(userForm.value);

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

.text {
  text-align: center;
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