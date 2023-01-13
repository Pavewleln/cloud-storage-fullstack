import axios from "axios"
const http = axios.create({
    baseURL: 'http://localhost:5000/api/'
})

http.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('jwt-token')
    return config
})
export default http