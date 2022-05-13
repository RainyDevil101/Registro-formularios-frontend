<template>
  <div v-if="questions === true">
    <questions @on:close="onQuestionsShow" />
  </div>

  <div v-if="rqsv === true">
    <rqsv @on:closeR="onRqsvShow" />
  </div>

  <div class="filter-align">
    <div class="filter">
      <h3><b>FILTRAR</b></h3>
      <div class="input-date-search">
        <div class="dates">
          <div class="input-config">
            <h5><b>Desde</b></h5>
            <input type="date" v-model="filters.dateFormat.initDate" />
          </div>
          <div class="input-config">
            <h5><b>Hasta</b></h5>
            <input type="date" v-model="filters.dateFormat.finDate" />
          </div>
        </div>
        <div class="input-config">
          <h5><b>Faena</b></h5>
          <select v-model="filters.taskName" class="task-width">
            <option v-for="task of tasks" :key="task._id" :value="task.name">
              {{ task.name }}
            </option>
          </select>
        </div>
        <div class="input-config">
          <button @click="onReset" class="btn button-color mt-2"><b>Resetear</b></button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="errorMessage === true" class="noData">
    <div>
      <no-data />
    </div>
  </div>

  <div v-else class="dashboard-view">
    <div class="totalAndReviewed">
      <total-and-reviewed-forums v-if="firstChart" :key="firstChart" :firstChart="firstChart" />
      <no-data v-else />
    </div>
    <div class="averageReviewed">
      <donut v-if="secondChart" :key="secondChart" :secondChart="secondChart" />
      <no-data v-else />
    </div>
    <div class="artToDate">
      <lines-art v-if="thirdChart" :key="thirdChart" :thirdChart="thirdChart" />
      <no-data v-else />
    </div>
    <div class="averageCompleted">
      <pie v-if="forthChart" :key="forthChart" :forthChart="forthChart" />
      <no-data v-else />
    </div>
    <div class="rcPrevented">
      <line-pre v-if="fifthChart" @on:Rqsv="onRqsvShow" :key="fifthChart" :fifthChart="fifthChart" />
      <no-data v-else />
    </div>
    <div class="noPerAnswer">
      <answers-no v-if="sixChart" @on:Questions="onQuestionsShow" :key="sixChart" :sixChart="sixChart" />
      <no-data v-else />
    </div>
    <div class="cuantityfaena">
      <faenas v-if="sevenChart" :key="sevenChart" :sevenChart="sevenChart" />
      <no-data v-else />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import Donut from "../components/Donut.vue";
import TotalAndReviewedForums from "../components/TotalAndReviewedForums.vue";
import LinesArt from "../components/LinesArt.vue";
import Pie from "../components/Pie.vue";
import LinePre from "../components/LinePre.vue";
import AnswersNo from "../components/AnswersNo.vue";
import Faenas from "../components/Faenas.vue";
import Questions from "../components/Questions.vue";
import Rqsv from "../components/Rqsv.vue";
import getForms from "../composables/gets";
import getTask from "../../gets/getTask";
import NoData from "../components/NoData.vue";

export default {
  components: {
    TotalAndReviewedForums,
    Donut,
    LinesArt,
    Pie,
    LinePre,
    AnswersNo,
    Faenas,
    Questions,
    Rqsv,
    NoData
  },

  setup() {
    const store = useStore();

    const filters = ref({
      dateFormat: {
        initDate: "",
        finDate: "",
      },
      taskName: "",
    });

    const { firstChart, secondChart, thirdChart, forthChart, fifthChart, sixChart, sevenChart, errorMessage, chartValues } = getForms(filters.value);

    const { searchTask, tasks } = getTask();

    const questions = ref(false);

    const rqsv = ref(false);

    watch(
      () => [
        filters.value.dateFormat.initDate,
        filters.value.dateFormat.finDate,
        filters.value.taskName,
      ],
      () => {
        chartValues(filters.value);
      }
    );

    return {
      questions,
      rqsv,
      filters,
      searchTask,
      tasks,
      chartValues,
      firstChart,
      secondChart,
      thirdChart,
      forthChart,
      fifthChart,
      sixChart,
      sevenChart,
      errorMessage,

      onReset: () => {
        filters.value = {
          dateFormat: {
            initDate: "",
            finDate: "",
          },
          taskName: "",
        };

        return;
      },

      onQuestionsShow: () => {
        if (questions.value === false) {
          questions.value = true;
          return;
        }

        if (questions.value === true) {
          questions.value = false;
          return;
        }
      },
      onRqsvShow: () => {
        if (rqsv.value === false) {
          rqsv.value = true;
          return;
        }

        if (rqsv.value === true) {
          rqsv.value = false;
          return;
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard-view {
  grid-auto-flow: dense;
  // margin-top: 70px;
  padding-bottom: 70px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px),1fr));
  grid-auto-rows: auto;
}

.button-color {
  color: white;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.filter-align {
  // height: 35vh;
  padding-top: 30px;
  margin-bottom: 30px;
}

.filter {
  margin: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 300px;
  background-color: white;
}

.input-date-search {
  display: block;
  align-items: center;
  justify-content: center;
}

.task-width {
  width: 130px;
}

.dashboard-view>div {
  text-align: center;
  margin: auto;
  background-color: white;
  padding: 20px;
  // width: 90%;
  border-radius: 4px;
}
.noData>div {
  text-align: center;
  margin: auto;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 4px;
}

.noData {
  padding-bottom: 70px;
}

.input-config {
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px 6px 5px 6px;
}

h5 {
  color: white;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
}

h3 {
  text-decoration: underline;
}

// X-Small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) {

//   .dashboard-view>div {

//     width: 300px;

//   }

// }

// @media screen and (min-width: 768px) {

//   .dashboard-view>div {

//     width: 500px;

//   }

//   .totalAndReviewed .averageReviewed .artToDate .averageCompleted .rcPrevented .noPerAnswer .cuantityfaena .questions {
//     grid-column-start: 1;
//     grid-column-end: -1;
//   }
// }



// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) {}

// // X-Large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) {}

// // XX-Large devices (larger desktops, 1400px and up)
// @media (min-width: 1400px) {}
</style>
