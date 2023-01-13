import {filesService} from "@/services/files.service";

export default {
    namespaced: true,
    state() {
        return {
            files: [],
            currentDir: null
        }
    },
    mutations: {
        setFiles(state, files) {
            state.files = files
        },
        addFiles(state, file) {
            state.files.push(file)
        },
        setCurrentDir(state, dirId){
            state.currentDir = dirId
        }
    },
    actions: {
        async get({commit}, dirId) {
            try {
                const {files} = await filesService.get(dirId)
                if (files) {
                    commit("setFiles", files)
                }
                return files
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async createDir({commit}, {name, dirId}) {
            try {
                const data = await filesService.createDir(name, dirId)
                commit("addFiles", data)
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },
    getters: {
        files(state) {
            return state.files
        },
        currentDir(state) {
            return state.currentDir
        }
    }
}