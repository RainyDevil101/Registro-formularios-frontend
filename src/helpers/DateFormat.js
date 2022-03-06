
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear = ( manDate, manDateAc ) => {

    const date = new Date ( manDate )
    const dateAc = new Date ( manDateAc )

    return {
        day: date.getDate(),
        month: months[ date.getMonth() ],
        yearDay: `${ date.getFullYear() }, ${ days[ date.getDay() ] }`,

        dayAc: dateAc.getDate(),
        monthAc: months[ dateAc.getMonth() ],
        yearDayAc: `${ dateAc.getFullYear() }, ${ days[ dateAc.getDay() ] }`,
    }

}

export default getDayMonthYear