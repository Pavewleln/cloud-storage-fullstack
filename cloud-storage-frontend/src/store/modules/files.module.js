import {filesService} from "@/services/files.service";
import {MessageToast} from "@/utils/AlertError";
import {errors} from "@/utils/errors";
import http from "@/services/config";

export default {
    namespaced: true,
    state() {
        return {
            files: [],
            currentDir: null,
            currentDirHistory: [],
            arrayNamesDir: [],
            progressFileUpload: 0
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
        pushArrayNamesDir(state, dirName) {
            state.arrayNamesDir = [...state.arrayNamesDir, dirName]
        },
        prevArrayNamesDir(state) {
            state.arrayNamesDir.splice(-1, 1)
        },
        folderPrev(state) {
            state.currentDirHistory = state.currentDirHistory.filter(c => c !== state.currentDir)
            state.currentDir = state.currentDirHistory.pop()
        },
        deleteFile(state, fileId) {
            state.files = state.files.filter(
                (c) => c._id !== fileId
            );
        },
        updateNameFile(state, {name, id}) {
            state.files[state.files.findIndex((f) => f._id === id)].name = name
        },
        changeUploadFile(state, progress) {
            state.progressFileUpload = progress
        },
        removeChangeUploadFile(state) {
            state.progressFileUpload = 0
        }
    },
    actions: {
        async get({commit}, {dirId, sort}) {
            try {
                const files = await filesService.get(dirId, sort)
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
                const {data} = await http.post('/files/upload', formData, {
                    onUploadProgress: e => {
                        const progress = Math.round(e.loaded * 100 / e.total)
                        commit("changeUploadFile", progress)
                    }
                })
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
        },
        async updateNameFile({commit}, {name, id}) {
            try {
                await filesService.updateNameFile(name, id)
                commit("updateNameFile", {name, id})
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        },
        async searchFile({commit}, fileName) {
            try {
                const file = await filesService.searchFile(fileName)
                if (file === []) {
                    alert("Такого файла нету")
                }
                commit("setFiles", file)
            } catch (err) {
                MessageToast(errors(err.response.data.message))
                throw err
            }
        }
    }
}