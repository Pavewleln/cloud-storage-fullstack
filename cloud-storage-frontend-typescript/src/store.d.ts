import { Store } from 'vuex'
type auth = {
    diskSpace: number,
    email: string,
    firstname: string,
    id: number,
    lastname: string,
    usedSpace: number,
    avatar: string | null
}
declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        count: number,
        auth: auth
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}