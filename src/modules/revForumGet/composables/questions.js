const getAnswers = () => {

    const answers = [
        { 'number': 1, 'question': '¿SE IDENTIFICAN LA TOTALIDAD DE LOS RIESGOS CRÍTICOS (RC) PRESENTES EN LA TAREA?', 'response': '' },
        { 'number': 2, 'question': '¿LOS CONTROLES CRÍTICOS CORRESPONDEN A LOS RC IDENTIFICADOS DE LIBRETA DE PREGUNTAS?', 'response': '' },
        { 'number': 3, 'question': '¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL SUPERVISOR?', 'response': '' },
        { 'number': 4, 'question': '¿SE CUMPLEN LOS CONTROLES CRÍTICOS ESTABLECIDOS POR EL TRABAJADOR?', 'response': '' },
        { 'number': 5, 'question': '¿SE CONTESTARON TODAS LAS PREGUNTAS TRANSVERSALES (CUANDO APLICAN)?', 'response': '' },
        { 'number': 6, 'question': '¿TODOS LOS TRABAJADORES FIRMARON LA TOMA DE CONOCIMIENTO DE LA ART?', 'response': '' },
        { 'number': 7, 'question': '¿TODOS LOS INTEGRANTES DE LA TAREA CONOCEN EL CORRECTO USO DE LA ART?', 'response': '' },
        { 'number': 8, 'question': '¿EL SUPERVISOR TITULAR O SUPERVISOR REEMPLAZANTE FIRMÓ EL ART?', 'response': '' },
        { 'number': 9, 'question': '¿FUERON CORREGIDAS LAS DESVIACIONES?', 'response': '' },
    ];

    const answersText = [
        { 'number': 10, 'question': 'OPORTUNIDADES ENCONTRADAS', 'response': '' },
        { 'number': 11, 'question': 'FORTALEZA DE LA CDP', 'response': '' }
    ]

    return {
        answers,
        answersText,
    }

}

export default getAnswers