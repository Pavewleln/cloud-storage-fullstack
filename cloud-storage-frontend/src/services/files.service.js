import http, {API_URL} from "@/services/config";

export const filesService = {
    get: async (dirId, sort) => {
        let url = `${API_URL}/files`
        if (dirId) {
            url = `${API_URL}/files?parent=${dirId}`
        }
        if (sort) {
            url = `${API_URL}/files?sort=${sort}`
        }
        if (dirId && sort) {
            url = `${API_URL}/files?parent=${dirId}&sort=${sort}`
        }
        const {data} = await http.get(url)
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
    deleteFile: async (fileId) => {
        const {data} = await http.delete(`/files?id=${fileId}`)
        return data
    },
    updateNameFile: async (name, id) => {
        const {data} = await http.patch('/files/update/'+id, {
            name: name
        })
        return data
    },
    searchFile: async (fileName) => {
        const {data} = await http.get(`/files/search?search=${fileName}`)
        return data
    }
}