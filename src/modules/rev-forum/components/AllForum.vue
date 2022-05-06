<template>
    <div
        class="mx-1 forum-container pointer p-2"
        :class="[ allForums.statusForum === 'PENDIENTE' ? test1 : test2 ]"
        @click="[ allForums.statusForum === 'PENDIENTE' ? $router.push({ name: 'get-forum', params: { id: allForums._id } }) : $router.push({ name: 'get-forum-completed', params: { id: allForums._id } }) ]"
    >
        <div class="forum-title user-container">
            <span class="user-name">{{ allForums.name }}</span>
            <span class="user-code">{{ allForums.code }}</span>
            <span class="mx-1 user-date">{{ allForums.dateFormat }}</span>
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

        const test1 = ref('testing1');
        const test2 = ref('testing2');

        const forumDate = ref();
        forumDate.value = props.allForums.date

        return {
            forumDate,
            test1,
            test2,

        }
    }

}

</script>

<style lang="scss" scoped>

span {
    font-size: 10px;
}

.testing1 {
    background-color: #ffe70e;
    border: 2px solid #d4c009;

        &:hover {
        background-color: rgba($color: #d4c009, $alpha: 1.0);
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}

.testing2 {
    background-color: #fff;
    border: 2px solid grey;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
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

    &:hover {
        transition: 0.2s all ease-in;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>