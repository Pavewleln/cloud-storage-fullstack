import {filesService} from "@/services/files.service";
import {MessageToast} from "@/utils/AlertError";
import {errors} from "@/utils/errors";

export default {
    namespaced: true,
    state() {
        return {
            files: [],
            currentDir: null,
            currentDirHistory: []
        }
    },
    mutations: {
        setFiles(state, files) {
            state.files = files
        },
        addFiles(state, file) {
            state.files.push(file)
        },
        setCurrentDir(state, dirId) {
            state.currentDir = dirId
        },
        folderNext(state, dirId) {
            state.currentDirHistory = [...state.currentDirHistory, dirId]
        },
        folderPrev(state) {
            state.currentDirHistory = state.currentDirHistory.filter(c => c !== state.currentDir)
            state.currentDir = state.currentDirHistory.pop()
        },
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
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async createDir({commit}, {name, dirId}) {
            try {
                const data = await filesService.createDir(name, dirId)
                commit("addFiles", data)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
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