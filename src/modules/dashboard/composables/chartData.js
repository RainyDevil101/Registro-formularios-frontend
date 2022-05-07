import { ref } from "vue";

const chartData = (data) => {

    const firstChartValue = ref(null);
    const secondChartValue = ref(null);
    const thirdChartValue = ref(null);
    const forthChartValue = ref(null);
    const fifthChartValue = ref(null);
    const sixChartValue = ref(null);
    const sevenChartValue = ref(null);
    const errorMessages = ref(false);

    if (data.length > 0) {
        const completedForums = data.filter(key => key.statusForum === 'REVISADO')

        //FirstChart

        firstChartValue.value = [data.length, completedForums.length]

        //SecondChart

        const total = (completedForums.length * 100) / data.length;
        const rest = 100 - total;

        secondChartValue.value = [total, rest];

        //ThirdChart

        const users = []
        const counts = {}

        for (const u of data) {
            users.push(u.user.name)
        }

        Object.values(users).forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })

        const user = Object.keys(counts)
        const userRepeat = Object.values(counts)

        thirdChartValue.value = [user, userRepeat]

        //ForthChart

        if (completedForums.length > 0) {
            const quality = []
            const totalAverage = []

            console.log(data);

            for (const q of data) {
                if (q.userRevisor) {
                    quality.push(q.calidad)
                }
            }

            const stringNumbers = Object.values(quality)
            const toNumbers = stringNumbers.map(Number)

            const add = toNumbers.reduce(function (x, y) {
                return x + y;
            }, 0)

            const totalNumbers = toNumbers.length

            const average = add / totalNumbers

            const percentAverage = 100 - average

            totalAverage.push(average, percentAverage)
    
            forthChartValue.value = totalAverage

        } else {
            forthChartValue.value = null
        }


        //FifthChart

        if (completedForums.length > 0) {
            const qOne = []
        const qTwo = []
        const qThree = []
        const qFour = []
        const qFive = []

        const answersRepeat = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 }

        for (const fC of completedForums) {
            qOne.push(fC.question1)
            qTwo.push(fC.question2)
            qThree.push(fC.question3)
            qFour.push(fC.question4)
            qFive.push(fC.question5)
        }

        Object.values(qOne).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
        Object.values(qTwo).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
        Object.values(qThree).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
        Object.values(qFour).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
        Object.values(qFive).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })


        const arrayValues = Object.values(answersRepeat)

        fifthChartValue.value = arrayValues
    } else {
            fifthChartValue.value = null

        }

        //SixChart

        if (completedForums.length > 0) {
            const noAnswers1 = []
        const noAnswers2 = []
        const noAnswers3 = []
        const noAnswers4 = []
        const noAnswers5 = []
        const noAnswers6 = []
        const noAnswers7 = []
        const noAnswers8 = []
        const noAnswers9 = []

        const noAnswersRepeat = []

        for (const n of completedForums) {
            if (n.riesgosCriticos === 'no') {
                noAnswers1.push(n.riesgosCriticos)
            }
            if (n.controelsCriticos === 'no') {
                noAnswers2.push(n.controelsCriticos)
            }
            if (n.cumplenControles === 'no') {
                noAnswers3.push(n.cumplenControles)
            }
            if (n.trabControles === 'no') {
                noAnswers4.push(n.trabControles)
            }
            if (n.contestaronPreguntas === 'no') {
                noAnswers5.push(n.contestaronPreguntas)
            }
            if (n.todosTrabajadores === 'no') {
                noAnswers6.push(n.todosTrabajadores)
            }
            if (n.todosIntegrantes === 'no') {
                noAnswers7.push(n.todosIntegrantes)
            }
            if (n.supervisorTitular === 'no') {
                noAnswers8.push(n.supervisorTitular)
            }
            if (n.fueronCorregidas === 'no') {
                noAnswers9.push(n.fueronCorregidas)
            }
        }

        noAnswersRepeat.push(noAnswers1.length, noAnswers2.length, noAnswers3.length, noAnswers4.length, noAnswers5.length, noAnswers6.length, noAnswers7.length, noAnswers8.length, noAnswers9.length)

        sixChartValue.value = noAnswersRepeat
    } else {
            sixChartValue.value = null

        }

        //SevenChart

        const det = []
        const dand = []
        const dfv = []
        const dsal = []
        const dch = []
        const sdand = []
        const sdet = []
        const casaMatríz = []

        const faenasChart = []

        for (const f of data) {
            if (f.task.name === 'DET') {
                det.push(f.task.name)
            }
            if (f.task.name === 'DAND') {
                dand.push(f.task.name)
            }
            if (f.task.name === 'DFV') {
                dfv.push(f.task.name)
            }
            if (f.task.name === 'DSAL') {
                dsal.push(f.task.name)
            }
            if (f.task.name === 'DCH') {
                dch.push(f.task.name)
            }
            if (f.task.name === 'SDAND') {
                sdand.push(f.task.name)
            }
            if (f.task.name === 'SDET') {
                sdet.push(f.task.name)
            }
            if (f.task.name === 'CASA MATRIZ') {
                casaMatríz.push(f.task.name)
            }
        }

        faenasChart.push(det.length, dand.length, dfv.length, dsal.length, dch.length, sdand.length, sdet.length, casaMatríz.length)

        sevenChartValue.value = faenasChart
        errorMessages.value = false

    } else {
        firstChartValue.value = null
        secondChartValue.value = null
        thirdChartValue.value = null
        forthChartValue.value = null
        fifthChartValue.value = null
        sixChartValue.value = null
        sevenChartValue.value = null
        errorMessages.value = true
    }

    return {
        firstChartValue,
        secondChartValue,
        thirdChartValue,
        forthChartValue,
        fifthChartValue,
        sixChartValue,
        sevenChartValue,
        errorMessages,
    }

}

export default chartData