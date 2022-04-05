<template>
    <div
        class="mx-1 forum-container pointer p-2"
        @click="$router.push({ name: 'get-forum-all', params: { id: allForums._id } })"
    >
        <div class="forum-title user-container">
            <span class="user-name">{{ allForums.name }}</span>
            <span class="user-code">{{ allForums.code }}</span>
            <span class="mx-1 user-date">{{ allForums.dayList }} {{ allForums.monthList }} {{ allForums.yearList }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {

    props: {
        allForums: {
            type: Object,
            required: true,
        },
    },

    setup(props) {


        const forumDate = ref();
        forumDate.value = props.allForums.date

        return {
            forumDate,

        }
    }

}

</script>

<style lang="scss" scoped>

span {
    font-size: 10px;
}
.user-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user-name {
    overflow: hidden;
    width: 150px;
}

.user-code {
    width: 50px;
}

.user-date {
    overflow: hidden;
    width: 100px;
}

.forum-container {
    text-align: center;
    background-color: white;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    border: 0.01rem solid rgb(255, 255, 255);

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>