import {authService} from "@/services/auth.service";
import router from "@/router";
import {MessageToast} from "@/utils/AlertError";
import {errors} from "@/utils/errors";
import {Register} from "@/views/AuthRegister.vue";
import {Login} from "@/views/AuthLogin.vue";

const TOKEN_KEY = 'jwt-token'
type initialState = {
    token: string | null,
    auth: auth | null
}
type auth = {
    diskSpace: number,
    email: string,
    firstname: string,
    id: number,
    lastname: string,
    usedSpace: number,
    avatar: string | null
}
export default {
    namespaced: true,
    state: <initialState>{
        token: window.localStorage.getItem(TOKEN_KEY),
        auth: {}
    },
    mutations: {
        setAuth(state: initialState, payload: auth) {
            state.auth = payload
        },
        logout(state: initialState) {
            state.token = null
            state.auth = null
            window.localStorage.removeItem(TOKEN_KEY)
        },
        setToken(state: initialState, token: string) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        deleteAvatar(state: initialState){
            state.auth ? state.auth.avatar = null : null
        }
    },
    actions: {
        async login(commit: any, payload: Login) {
            try {
                const {token} = await authService.login(payload.email, payload.password)
                commit('setToken', token)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async registration(commit: any, payload: Register) {
            try {
                const {token} = await authService.registration(payload)
                commit('setToken', token)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async auth(commit: any) {
            try{
                const {user} = await authService.getAuth()
                commit("setAuth", user)
            } catch (err: any) {
                if(err.response.statusText === 'Unauthorized') {
                    await router.push("/login?token=not-valid")
                }
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async uploadAvatar(commit: any, file: any) {
            try {
                const formData: any = new FormData()
                formData.append('file', file)
                const data = await authService.uploadAvatar(formData)
                commit("setAuth", data)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async deleteAvatar(commit: any) {
            try {
                await authService.deleteAvatar()
                commit("deleteAvatar")
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        }
    },
    getters: {
        auth(state: initialState) {
            return state.auth
        },
        isAuthenticated(state: initialState){
            return !!state.token
        }
    }
}