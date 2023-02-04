import http from "@/services/config";
import {Register} from "@/views/AuthRegister.vue";
type authService = {
    login: (email: string, password: string) => any,
    registration: (payload: Register) => any,
    getAuth: () => any,
    uploadAvatar: (formData: any) => any,
    deleteAvatar: () => any
}

export const authService: authService = {
    login: async (email, password) => {
        const {data} = await http.post("/auth/login", {
            email, password
        })
        return data
    },
    registration: async (payload) => {
        const {data} = await http.post("/auth/registration", payload)
        return data
    },
    getAuth: async () => {
        const {data} = await http.get("/auth/auth")
        return data
    },
    uploadAvatar: async (formData) => {
        const {data} = await http.post("/files/avatar", formData)
        return data
    },
    deleteAvatar: async () => {
        const {data} = await http.delete("/files/avatar")
        return data
    }
}