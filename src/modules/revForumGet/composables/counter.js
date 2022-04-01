import { ref } from "vue";

const counter = () => {

    const counts = []
    const calidad = ref(null);

    const aCounter = (yes) => {

        if (!yes) return

        Object.values(yes).slice(0, 9).forEach(function (x) { counts[x] = (counts[x] || 0) + 1 });

        const { si } = counts

        switch (si) {
            case 0:
                calidad.value = '0'
                break;

            case 1:
                calidad.value = '11'
                break;

            case 2:
                calidad.value = '22'
                break;

            case 3:
                calidad.value = '33'
                break;

            case 4:
                calidad.value = '44'
                break;

            case 5:
                calidad.value = '55'
                break;

            case 6:
                calidad.value = '66'
                break;

            case 7:
                calidad.value = '77'
                break;

            case 8:
                calidad.value = '88'
                break;

            case 9:
                calidad.value = '100'
                break;
        }

        return { calidad, si }

    }

    return {
        counts,
        aCounter,
        calidad,
    }

}

export default counter