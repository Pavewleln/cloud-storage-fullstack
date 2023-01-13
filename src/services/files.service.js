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
    }
}