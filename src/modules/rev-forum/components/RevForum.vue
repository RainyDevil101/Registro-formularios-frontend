<template>
    <div
        class="mx-1 forum-container pointer p-2"
        @click="$router.push({ name: 'get-forum', params: { id: forum._id } })"
    >
        <div class="forum-title d-flex justify-content-between">
            <span>{{ forum.name }}</span>
            <span class="mx-1">{{ forum.dayList }} {{ forum.monthList }} {{ forum.yearList }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {

    props: {
        forum: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const forumDate = ref();
        forumDate.value = props.forum.date

        return {
            forumDate
        }
    }

}

</script>

<style lang="scss" scoped>
.forum-container {
    text-align: center;
    background-color: white;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    border: 0.01rem solid rgb(255, 255, 255);

    &:hover {
        font-size: 18px;
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>