import axios from "axios";

// const backendConnect = axios.create({
//     baseURL: 'http://localhost:6001'
// })

const backendConnect = axios.create({
   baseURL: 'https://forum-questionary.herokuapp.com'
})

export default backendConnect
