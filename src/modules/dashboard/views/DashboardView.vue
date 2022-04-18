<template>
    <div class="dashboard-view my-5">
        <div v-if="allCR === true" class="totalAndReviewed">
            <total-and-reviewed-forums :allC="allC" />
        </div>
        <div class="averageReviewed">
            <donut />
        </div>
        <div class="artToDate">
            <lines-art />
        </div>
        <div class="averageCompleted">
            <pie />
        </div>
        <div class="rcPrevented">
            <line-pre />
        </div>
        <div class="noPerAnswer">
            <answers-no />
        </div>
        <div class="cuantityfaena">
            <faenas />
        </div>
        <div class="questions"></div>
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

export default {

    components: { TotalAndReviewedForums, Donut, LinesArt, Pie, LinePre, AnswersNo, Faenas },

    setup() {

        const store = useStore();

        const allC = ref(store.state.forums.allArray)
        const allCR = ref(store.state.forums.allCoountRdy)


        watch(
            () => store.state.forums.allCountRdy,
            () => (allC.value = store.state.forums.allArray)
        )

        watch(
            () => store.state.forums.allCountRdy,
            () => (allCR.value = store.state.forums.allCountRdy)
        )

        return {
            allC,
            allCR,

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