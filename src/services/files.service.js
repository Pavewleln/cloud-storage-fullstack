import http from "@/services/config";

export const filesService = {
    get: async (dirId) => {
        const {data} = await http.get(`/files${dirId ? '?parent='+dirId : ''}`)
        return data
    },
    createDir: async (name, dirId) => {
        const {data} = await http.post('/files', {
            name,
            parent: dirId,
            type: 'dir'
        })
        return data
    },
    uploadFile: async (formData) => {
        const {data} = await http.post('/files/upload', formData, {
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log('total', totalLength)
                if(totalLength) {
                    let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    console.log(progress)
                }
            }
        })
        return data
    },
    deleteFile: async (fileId) => {
        const {data} = http.delete(`/files?id=${fileId}`)
        return data
    }
}