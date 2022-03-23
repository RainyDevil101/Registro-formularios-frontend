<template>
    <div class="full-text">
        <div class="text-q">
            <p>{{ answer.question }}</p>
            <div class="input-t">
                <div class="checkbox-answers">
                    <div class="checkbox-ans">
                        <input class="form-check-input" type="radio" value="SI" v-model="response" />
                        <label class="form-check-label">Si</label>
                    </div>
                    <div class="checkbox-ans">
                        <input class="form-check-input" type="radio" value="NO" v-model="response" />
                        <label class="form-check-label">No</label>
                    </div>
                </div>
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
    width: 300px;
    padding: 2px;
    border-radius: 4px;
    display: block;
    background-color: white;
    margin: auto;
}

.input-t {
    text-align: center;
}

.checkbox-ans {
    align-items: center;
    justify-content: center;
    display: flex;
    margin: auto;
}

label {
    width: 200px;
    margin-top: 4px;
    margin-bottom: 4px;
}

input[type="text"] {
    width: 40px;
    margin-bottom: 4px;
    background-color: rgba($color: #dfdfdf, $alpha: 1);
    border: 0.2px solid black;
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 600px) {
    .text-q {
        width: 400px;
    }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
    .text-q {
        width: 600px;
    }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    .text-q {
        width: 800px;
    }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>