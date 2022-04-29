<template>
    <div class="modal-background fade-in" @click.self="$emit('on:close')">
        <div class="modal-container">
            <div class="img-scroll">
                <p><b>1</b> ¿SE IDENTIFICAN LA TOTALIDAD DE LOS RIESGOS CRÍTICOS (RC) PRESENTES EN LA TAREA?</p>
                <p><b>2</b> ¿LOS CONTROLES CRÍTICOS CORRESPONDEN A LOS RC IDENTIFICADOS DE LIBRETA DE PREGUNTAS?</p>
                <p><b>3</b> ¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL SUPERVISOR?</p>
                <p><b>4</b> ¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL TRABAJADOR?</p>
                <p><b>5</b> ¿SE CONTESTARON TODAS LAS PREGUNTAS TRANSVERSALES (CUANDO APLICAN)?</p>
                <p><b>6</b> ¿TODOS LOS TRABAJADORES FIRMARON LA TOMA DE CONOCIMIENTO DE LA ART?</p>
                <p><b>7</b> ¿TODOS LOS INTEGRANTES DE LA TAREA CONOCEN EL CORRECTO USO DE LA ART?</p>
                <p><b>8</b> ¿EL SUPERVISOR TITULAR O SUPERVISOR REEMPLAZANTE FIRMÓ EL ART?</p>
                <p><b>9</b> ¿FUERON CORREGIDAS LAS DESVIACIONES?</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {

    emits: ['on:close'],

    props: {
        userAn: {
            type: String
        }
    },

    setup(props) {

        const userAnProps = ref();
        userAnProps.value = props.userAn

        return {
            userAnProps
        }

    }

}
</script>

<style lang="scss" scoped>
img {
    // max-height: 600px;
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
</style>