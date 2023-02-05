import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        count: number,
        files: Array<{
            __v: number,
            _id: string,
            childs: Array<object>,
            date: string,
            name: string,
            parent: string
            path: string
            type: string
            size: number
            user: string
        }>,
        currentDir: string | null | undefined,
        currentDirHistory: Array<string>,
        arrayNamesDir: Array<string>,
        progressFileUpload: number,
        token: string | null,
        auth: {
            diskSpace: number,
            email: string,
            firstname: string,
            id: number,
            lastname: string,
            usedSpace: number,
            avatar: string | null
        } | null
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}