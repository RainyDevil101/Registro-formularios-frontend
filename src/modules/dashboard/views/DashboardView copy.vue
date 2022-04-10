<template>
    <div class="dashboard-view mt-5">
        <div class="totalAndReviewed">
            <total-and-reviewed-forums />
        </div>
        <div class="averageReviewed"></div>
        <div class="artToDate"></div>
        <div class="averageCompleted"></div>
        <div class="rcPrevented"></div>
        <div class="noPerAnswer"></div>
        <div class="cuantityfaena"></div>
        <div class="questions"></div>
    </div>
</template>

<script>
import TotalAndReviewedForums from '../components/TotalAndReviewedForums.vue'

export default {

    components: { TotalAndReviewedForums },

    setup() {



        return {

        }

    }
}

</script>

<style lang="scss" scoped>
.dashboard-view {
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat((6, auto));
}

.dashboard-view > div {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
}

.dashboard-view .questions {
    grid-column-start: 1;
    grid-column-end: -1;
}

@media screen and (max-width: 768px) {
    .dashboard-view .totalAndReviewed {
        grid-column-start: 1;
        grid-column-end: -1;
    }

    .dashboard-view .averageReviewed {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .artToDate {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .averageCompleted {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .rcPrevented {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .noPerAnswer {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .cuantityfaena {
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .dashboard-view .questions {
        grid-column-start: 1;
        grid-column-end: -1;
    }
}
</style>