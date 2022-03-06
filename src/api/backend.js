import axios from "axios";

const backendConnect = axios.create({
    baseURL: 'http://localhost:6001'
})

export default backendConnect