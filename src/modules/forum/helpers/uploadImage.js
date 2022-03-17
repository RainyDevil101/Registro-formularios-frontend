// import backendConnect from '../../../api/backend';

import axios from "axios"

const uploadImageAn = async ( imgAn ) => {


    if (! imgAn ) return

    try {

        const formData = new FormData()
        formData.append('upload_preset', 'jhkujgxf')
        formData.append('file', imgAn)



        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dcyoqnzg8/image/upload', formData)

        return data.secure_url



    } catch (error) {
        console.error('Error al cargar el archivo');
        console.log(error);
        return null
    }

}

export default uploadImageAn