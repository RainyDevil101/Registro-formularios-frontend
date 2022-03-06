import { ref } from "vue"

const shortingText = (array) => {

    
    const text = array
    const shorterText = ref(null);
    
    if ( text.length > 20 ) {
        shorterText.value = text.substring(0,20) + '...'
        // console.log(shorterText.value);
    } else {
        shorterText.value = text
    }
    
    console.log('pepe');
    return {

        text,
        shorterText,

    }

}

export default shortingText