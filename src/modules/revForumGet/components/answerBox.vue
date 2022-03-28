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
    border-radius: 4px;
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 600px) {
    .text-q {
        width: 400px;
    }
    textarea {

    width: 300px;

}
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
    .text-q {
        width: 600px;
    }
        textarea {

    width: 500px;

}
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    .text-q {
        width: 800px;
    }
        textarea {

    width: 700px;

}
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>