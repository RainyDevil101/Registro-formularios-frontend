<template>
    <div class="full-text">
        <div class="text-q">
            <p>{{ answerText.question }}</p>
            <div class="input-t">
                <textarea v-model="responseBox" maxlength="70"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {

    props: {
        answerText: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const responseBox = ref([]);
        responseBox.value = props.answerText.response

        console.log([responseBox.value]);


        return {
            responseBox
        }
    }

}

</script>

<style lang="scss" scoped>
.full-text {
    margin-top: 8px;
    margin-bottom: 8px;
}
.text-q {
    padding: 2px;
    border-radius: 4px;
    display: block;
    background-color: white;
    width: 300px;
    margin: auto;
}

.input-t {
    text-align: center;
}

textarea {
    background-color: rgba($color: #dfdfdf, $alpha: 1);
    border: 0.2px solid black;
    width: 200px;
    resize: none;
}
</style>