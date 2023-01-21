import axios from "axios"
export const API_URL = 'http://localhost:5000/api'
const http = axios.create({
    baseURL: API_URL
})

http.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('jwt-token')
    return config
})
export default http