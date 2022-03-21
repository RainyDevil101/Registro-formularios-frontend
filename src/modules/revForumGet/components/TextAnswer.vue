<template>
    <div class="full-text">
        <div class="text-q">
            <p>{{answer.question}}</p>
            <div class="input-t">
                <input type="text"  v-model="response" maxlength="2">
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {

    props: {
        answer: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const response = ref([]);
        response.value = props.answer.response

        console.log([response.value]);


        return {
            response
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

input[type='text'] {
    width: 40px;
    margin-bottom: 4px;
    background-color: rgba($color: #dfdfdf, $alpha: 1.0);
    border: 0.2px solid black;
}

</style>