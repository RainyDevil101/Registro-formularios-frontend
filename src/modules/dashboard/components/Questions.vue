<template>
    <div class="modal-background fade-in" @click.self="$emit('on:close')">
        <div class="modal-container">
            <div class="img-scroll">
                <img src="../../../assets/questions.jpg" alt="No disponible">
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {

    emits: ['on:close'],

    setup() {

        return {

        }

    }

}
</script>

<style lang="scss" scoped>
img {
    width: 360px;
    border: 4px solid white;
}

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
}

.img-scroll {
    padding: 10px;
    max-height: 600px;
    height: auto;
    width: auto;
    overflow: auto;
    background-color: white;
}

.modal-container {
    color: black;
    width: auto;
    height: auto;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

.fade-in {
    animation: fadeIn ease-out 0.2s;
    -webkit-animation: fadeIn ease-out 0.2s;
    -moz-animation: fadeIn ease-out 0.2s;
    -o-animation: fadeIn ease-out 0.2s;
    -ms-animation: fadeIn ease-out 0.2s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-o-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-ms-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@media screen and (min-width: 768px) {

img {
    width: 700px;
    border: 4px solid white;
}

}
@media screen and (min-width: 1000px) {

img {
    width: 900px;
    border: 4px solid white;
}

}

</style>