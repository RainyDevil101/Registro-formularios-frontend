<template>
    <div class="dashboard-view my-5">
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
            <line-pre :key="answersRq" :answersRq="answersRq" />
        </div>
        <div class="noPerAnswer">
            <answers-no :key="answersNo" :answersNo="answersNo" />
        </div>
        <div class="cuantityfaena">
            <faenas :key="taskForums" :taskForums="taskForums" />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import Donut from '../components/Donut.vue'
import TotalAndReviewedForums from '../components/TotalAndReviewedForums.vue'
import LinesArt from '../components/LinesArt.vue'
import Pie from '../components/Pie.vue'
import LinePre from '../components/LinePre.vue'
import AnswersNo from '../components/AnswersNo.vue'
import Faenas from '../components/Faenas.vue'

export default {

    components: { TotalAndReviewedForums, Donut, LinesArt, Pie, LinePre, AnswersNo, Faenas },

    setup() {

        const store = useStore();

        const allC = ref(store.state.forums.allArray)

        const allPercent = ref(store.state.forums.allPercent)
        
        const userTotal = ref(store.state.forums.userArray)

        const userRepeat = ref(store.state.forums.userRepeat)

        const averageQuality = ref(store.state.forums.forumQuality)

        const answersRq = ref(store.state.forums.answersArray)

        const answersNo = ref(store.state.forums.noAnswers)

        const status = ref(store.state.forums.statusA)

        const taskForums = ref(store.state.forums.artTask)

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

    .dashboard-view {
        width: 50%;
    }

    .totalAndReviewed .averageReviewed .artToDate .averageCompleted .rcPrevented .noPerAnswer .cuantityfaena .questions {
        grid-column-start: 1;
        grid-column-end: -1;
    }
}
</style>