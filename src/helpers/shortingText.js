import { ref } from "vue"

const shortingText = (array) => {

    
    const text = array
    const shorterText = ref(null);
    
    if ( text.length > 20 ) {
        shorterText.value = text.substring(0,20) + '...'
    } else { 
        shorterText.value = text
    }
    
    return {

        text,
        shorterText,

    }

}

export default shortingText