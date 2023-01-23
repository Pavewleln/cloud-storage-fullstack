import {authService} from "@/services/auth.service";
import router from "@/router";
import {MessageToast} from "@/utils/AlertError";
import {errors} from "@/utils/errors";

const TOKEN_KEY = 'jwt-token'
export default {
    namespaced: true,
    state: {
        token: window.localStorage.getItem(TOKEN_KEY),
        auth: {}
    },
    mutations: {
        setAuth(state, payload) {
            state.auth = payload
        },
        logout(state) {
            state.token = null
            state.auth = {}
            window.localStorage.removeItem(TOKEN_KEY)
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        deleteAvatar(state){
            state.auth.avatar = null
        }
    },
    actions: {
        async login({commit}, {email, password}) {
            try {
                const {token} = await authService.login({email, password})
                commit('setToken', token)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async registration({commit}, payload) {
            try {
                const {token} = await authService.registration(payload)
                commit('setToken', token)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async auth({commit}) {
            try{
                const {user} = await authService.getAuth()
                commit("setAuth", user)
            } catch (err) {
                if(err.response.statusText === 'Unauthorized') {
                    await router.push("/login?token=not-valid")
                }
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async uploadAvatar({commit}, file) {
            try {
                const formData = new FormData()
                formData.append('file', file)
                const data = await authService.uploadAvatar(formData)
                commit("setAuth", data)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async deleteAvatar({commit}) {
            try {
                await authService.deleteAvatar()
                commit("deleteAvatar")
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        }
    },
    getters: {
        auth(state) {
            return state.auth
        },
        isAuthenticated(state){
            return !!state.token
        }
    }
}