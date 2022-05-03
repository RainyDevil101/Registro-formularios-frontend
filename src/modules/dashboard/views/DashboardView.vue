<template>

    <div v-if="questions === true">
        <questions @on:close="onQuestionsShow" />
    </div>

    <div v-if="rqsv === true">
        <rqsv @on:closeR="onRqsvShow" />
    </div>

    <div class="dashboard-view my-5">

        <div>
            <h3>Rango de fechas</h3>
            <div class="input-date-search">
                <div>
                    <input type="date"
                    v-model="initDate"
                    >
                </div>
                <div>
                    <input type="date"
                    v-model="finDate"
                    >
                </div>
                <div>
                    <button @click="onSearch" class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </div>

        <div class="totalAndReviewed">
            <total-and-reviewed-forums :key="allC" :allC="allC" />
        </div>
        <div class="averageReviewed">
            <donut :key="allPercent" :allPercent="allPercent" />
        </div>
        <div class="artToDate">
            <lines-art :key="userTotal" :userTotal="userTotal" :userRepeat="userRepeat" />
        </div>
        <div class="averageCompleted">
            <pie :key="averageQuality" :averageQuality="averageQuality" />
        </div>
        <div class="rcPrevented">
            <line-pre @on:Rqsv="onRqsvShow" :key="answersRq" :answersRq="answersRq" />
        </div>
        <div class="noPerAnswer">
            <answers-no @on:Questions="onQuestionsShow" :key="answersNo" :answersNo="answersNo" />
        </div>
        <div class="cuantityfaena">
            <faenas :key="taskForums" :taskForums="taskForums" />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import Donut from '../components/Donut.vue'
import TotalAndReviewedForums from '../components/TotalAndReviewedForums.vue'
import LinesArt from '../components/LinesArt.vue'
import Pie from '../components/Pie.vue'
import LinePre from '../components/LinePre.vue'
import AnswersNo from '../components/AnswersNo.vue'
import Faenas from '../components/Faenas.vue'
import Questions from '../components/Questions.vue'
import Rqsv from '../components/Rqsv.vue'
import getForms from '../composables/gets'

export default {

    components: { TotalAndReviewedForums, Donut, LinesArt, Pie, LinePre, AnswersNo, Faenas, Questions, Rqsv },

    setup() {

        const store = useStore();

        const allC = ref()

        const initDate = ref('');
        const finDate = ref('');

        const allPercent = ref(store.state.forums.allPercent)

        const userTotal = ref(store.state.forums.userArray)

        const userRepeat = ref(store.state.forums.userRepeat)

        const averageQuality = ref(store.state.forums.forumQuality)

        const answersRq = ref(store.state.forums.answersArray)

        const answersNo = ref(store.state.forums.noAnswers)

        const status = ref(store.state.forums.statusA)

        const taskForums = ref(store.state.forums.artTask)

        const questions = ref(false);

        const rqsv = ref(false);

        const { getAllArray } = getForms();

        const { totalAllArray } = getAllArray(['', '']);

        allC.value = totalAllArray.value

        watch(
            () => store.state.forums.statusA,
            () => (status.value = store.state.forums.statusA)
        )

        return {
            allC,
            allPercent,
            userTotal,
            userRepeat,
            averageQuality,
            status,
            answersRq,
            answersNo,
            taskForums,
            questions,
            rqsv,
            initDate,
            finDate,
            getAllArray,
            totalAllArray,

            onSearch: () => {

                const dates = [initDate.value, finDate.value]

                const { totalAllArray } = getAllArray(dates)

                return allC.value = totalAllArray.value

            },

            onQuestionsShow: () => {
                if (questions.value === false) {
                    questions.value = true
                    return
                }

                if (questions.value === true) {
                    questions.value = false
                    return
                }
            },
            onRqsvShow: () => {
                if (rqsv.value === false) {
                    rqsv.value = true
                    return
                }

                if (rqsv.value === true) {
                    rqsv.value = false
                    return
                }
            },
        }

    }
}

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

.input-date-search {
    display: block;
    align-items: center;
    justify-content: center;
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

@media screen and (min-width: 768px) {

    .input-date-search {
    display: flex;
    align-items: center;
    justify-content: center;
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