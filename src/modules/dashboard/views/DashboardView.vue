<template>
  <div v-if="questions === true">
    <questions @on:close="onQuestionsShow" />
  </div>

  <div v-if="rqsv === true">
    <rqsv @on:closeR="onRqsvShow" />
  </div>

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
        <button @click="onReset" class="btn mt-2 btn-primary"><b>Resetear</b></button>
      </div>
    </div>
  </div>

  <div class="dashboard-view my-5">
    <div class="totalAndReviewed">
      <total-and-reviewed-forums v-if="firstChart" :key="firstChart" :firstChart="firstChart" />
    </div>
    <!-- <div class="averageReviewed">
      <donut :key="totalAllArray" :allPercent="totalAllArray[1]" />
    </div>
    <div class="artToDate">
      <lines-art
        :key="totalAllArray"
        :userTotal="totalAllArray[2]"
        :userRepeat="totalAllArray[3]"
      />
    </div>
    <div class="averageCompleted">
      <pie :key="totalAllArray" :averageQuality="totalAllArray[4]" />
    </div>
    <div class="rcPrevented">
      <line-pre
        @on:Rqsv="onRqsvShow"
        :key="totalAllArray"
        :answersRq="totalAllArray[5]"
      />
    </div>
    <div class="noPerAnswer">
      <answers-no
        @on:Questions="onQuestionsShow"
        :key="totalAllArray"
        :answersNo="totalAllArray[6]"
      />
    </div>
    <div class="cuantityfaena">
      <faenas :key="totalAllArray" :taskForums="totalAllArray[7]" />
    </div> -->
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

    const { firstChart, firstChartValues, secondChartValues } = getForms(filters.value);

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
        firstChartValues(filters.value), secondChartValues(filters.value);
      }
    );

    return {
      questions,
      rqsv,
      filters,
      firstChart,
      searchTask,
      tasks,
      firstChartValues,
      secondChartValues,

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
  width: 90%;
  margin: 20px auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
}

.filter {
  text-align: center;
  margin-top: 4rem;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
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
  width: 80%;
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
}

.dashboard-view .questions {
  grid-column-start: 1;
  grid-column-end: -1;
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
  background-color: black;
  border-radius: 4px;
}

h3 {
  text-decoration: underline;
}

@media screen and (min-width: 768px) {
  .input-date-search {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .dashboard-view {
    width: 50%;
  }

  .totalAndReviewed .averageReviewed .artToDate .averageCompleted .rcPrevented .noPerAnswer .cuantityfaena .questions {
    grid-column-start: 1;
    grid-column-end: -1;
  }
}
</style>
