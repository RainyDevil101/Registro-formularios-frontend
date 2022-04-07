<template>
    <div
        class="mx-1 forum-container pointer p-2"
        v-bind:style="[ allForums.statusForum === 'PENDIENTE' ? {backgroundColor: color1, borderColor: border1} : {backgroundColor:color2, borderColor: border2}]"
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

        const color1 = ref('#ffe70e');
        const border1 = ref('#d4c009');
        const color2 = ref('#fff');
        const border2 = ref('grey');

        const forumDate = ref();
        forumDate.value = props.allForums.date

        return {
            forumDate,
            color1,
            color2,
            border2,
            border1,

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
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    border: 2px solid;

    &:hover {
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>