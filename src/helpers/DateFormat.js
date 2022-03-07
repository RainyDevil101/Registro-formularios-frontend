
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear = ( manDateAc ) => {

    const dateAc = new Date ( manDateAc )

    return {

        dayAc: dateAc.getDate(),
        monthAc: months[ dateAc.getMonth() ],
        yearDayAc: `${ dateAc.getFullYear() }, ${ days[ dateAc.getDay() ] }`,
    }

}

export default getDayMonthYear