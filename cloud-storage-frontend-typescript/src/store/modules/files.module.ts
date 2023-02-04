import {filesService} from "@/services/files.service";
import {MessageToast} from "@/utils/AlertError";
import {errors} from "@/utils/errors";
import http from "@/services/config";
import {Get} from "@/components/home/HomeSorting.vue";
import {createDir, updateDir} from "@/components/popups/PopupCreateDir.vue";
import {FileImport} from "@/components/AppButtonImport.vue";
type File = {
    __v: number,
    _id: string,
    childs: Array<object>,
    date: string,
    name: string,
    parent: any
    path: string
    type: string
    size: number
    user: string
}
type initialState = {
    files: Array<File>,
    currentDir: string | null | undefined,
    currentDirHistory: Array<string>,
    arrayNamesDir: Array<string>,
    progressFileUpload: number
}
export default {
    namespaced: true,
    state(): initialState {
        return {
            files: [],
            currentDir: null,
            currentDirHistory: [],
            arrayNamesDir: [],
            progressFileUpload: 0
        }
    },
    mutations: {
        setFiles(state: initialState, files: Array<File>) {
            state.files = files
        },
        addFiles(state: initialState, file: File) {
            state.files.push(file)
        },
        setCurrentDir(state: initialState, dirId: string) {
            state.currentDir = dirId
        },
        folderNext(state: initialState, dirId: string) {
            state.currentDirHistory = [...state.currentDirHistory, dirId]
        },
        pushArrayNamesDir(state: initialState, dirName: string) {
            state.arrayNamesDir = [...state.arrayNamesDir, dirName]
        },
        prevArrayNamesDir(state: initialState) {
            state.arrayNamesDir.splice(-1, 1)
        },
        folderPrev(state: initialState) {
            state.currentDirHistory = state.currentDirHistory.filter(c => c !== state.currentDir)
            state.currentDir = state.currentDirHistory.pop()
        },
        deleteFile(state: initialState, fileId: string) {
            state.files = state.files.filter(
                (c) => c._id !== fileId
            );
        },
        updateNameFile(state: initialState, payload: updateDir) {
            state.files[state.files.findIndex((f) => f._id === payload.id)].name = payload.name
        },
        changeUploadFile(state: initialState, progress: number) {
            state.progressFileUpload = progress
        },
        removeChangeUploadFile(state: initialState) {
            state.progressFileUpload = 0
        }
    },
    actions: {
        async get(commit: any, payload: Get) {
            try {
                const files = await filesService.get(payload.dirId, payload.sort)
                if (files) {
                    commit("setFiles", files)
                }
                return files
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async createDir(commit: any, payload: createDir) {
            try {
                const data = await filesService.createDir(payload.name, payload.dirId)
                commit("addFiles", data)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async uploadFile(commit: any, payload: FileImport) {
            try {
                const formData = new FormData()
                formData.append('file', payload.file)
                if (payload.dirId) {
                    formData.append('parent', payload.dirId)
                }
                const {data} = await http.post('/files/upload', formData, {
                    onUploadProgress: (e: any) => {
                        const progress = Math.round(e.loaded * 100 / e.total)
                        commit("changeUploadFile", progress)
                    }
                })
                commit("addFiles", data)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async downloadFile(_: any, file: any) {
            try {
                const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem("jwt-token")
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
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async deleteFile(commit: any, fileId: string) {
            try {
                await filesService.deleteFile(fileId)
                commit("deleteFile", fileId)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async updateNameFile(commit: any, payload: updateDir) {
            try {
                await filesService.updateNameFile(payload.name, payload.id)
                commit("updateNameFile", payload)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        },
        async searchFile(commit: any, fileName: string) {
            try {
                const file = await filesService.searchFile(fileName)
                if (file === []) {
                    alert("Такого файла нету")
                }
                commit("setFiles", file)
            } catch (err: any) {
                MessageToast(errors(err?.response?.data?.message))
                throw err
            }
        }
    }
}