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
        deleteFile(state, fileId) {
            state.files = state.files.filter(
                (c) => c._id !== fileId
            );
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
        },
        async uploadFile({commit}, {file, dirId}) {
            try {
                const formData = new FormData()
                formData.append('file', file)
                if (dirId) {
                    formData.append('parent', dirId)
                }
                const data = await filesService.uploadFile(formData)
                commit("addFiles", data)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async downloadFile(_, file) {
            try {
                const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('jwt-token')
                    }
                })
                if (response.status === 200) {
                    const blob = await response.blob()
                    const downloadUrl = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = downloadUrl
                    link.download = file.name
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                }
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async deleteFile({commit}, fileId) {
            try {
                await filesService.deleteFile(fileId)
                commit("deleteFile", fileId)
            } catch (err) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        }
    }
}